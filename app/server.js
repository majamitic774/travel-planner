const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const port = 3000;
const apiOrigin = process.env.API_ORIGIN || "http://api:8000";
const application = express();

// Security middleware
application.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Logging middleware
application.use(morgan('combined'));

// CSRF protection (skip for API routes since they're proxied)
const csrfProtection = csrf({ cookie: true });

// API proxy with error logging - MUST come before body parsing
application.use(
  "/api",
  createProxyMiddleware({
    target: apiOrigin,
    changeOrigin: true,
    ws: false,
    logLevel: 'debug',
    timeout: 30000,
    proxyTimeout: 30000,
    onError: (err, req, res) => {
      console.error('[HPM][error]', err.code, req.method, req.url);
      if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error' }));
      }
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('[HPM][proxyReq]', req.method, req.url, '->', apiOrigin + req.originalUrl);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('[HPM][proxyRes]', proxyRes.statusCode, req.method, req.url);
    }
  })
);

// Body parsing and cookie middleware (AFTER proxy to avoid consuming body)
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(cookieParser());

application.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  csrfProtection(req, res, next);
});

application.use(express.static("public"));

// CSRF token endpoint
application.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const indexFilePath = path.join(__dirname, "public", "index.html");

application.get("*", (request, response) => {
  response.sendFile(indexFilePath);
});

// Error handling middleware
application.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  console.error('Stack trace:', err.stack);
  
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

application.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API proxy target: ${apiOrigin}`);
});
