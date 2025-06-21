const { context } = require('esbuild')

const backendOrigin = JSON.stringify(process.env.API_ORIGIN || '')

const buildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  loader: { '.js': 'jsx', '.ts': 'ts', '.tsx': 'tsx' },
  define: { 'process.env.API_ORIGIN': backendOrigin }
}

const buildApplication = async watch => {

  const buildContext = await context(buildOptions)

  if (watch) {
    await buildContext.watch()
  } else {
    await buildContext.rebuild()

    await buildContext.dispose()
  }
}

const watchMode = process.argv.includes('--watch')

buildApplication(watchMode).catch(() => process.exit(1))
