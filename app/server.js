const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = 3000

const apiOrigin = process.env.API_ORIGIN || 'http://api:8000'

const application = express()

application.use(
  '/api',
  createProxyMiddleware({
    target: apiOrigin,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  })
)

application.use(express.static('public'))

application.listen(port)
