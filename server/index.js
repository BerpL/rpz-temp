/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const path = require('path');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

const { resolve } = require('path');
const app = express();

// Serve static files from "src" in dev mode
app.use(express.static(resolve(process.cwd(), 'src')));

// Serve static resources used both in dev and prod
app.use(
  '/public',
  express.static(
    resolve(process.cwd(), isDev ? 'public' : 'build/roshpinahzinc/public'),
  ),
);
app.use(
  '/images',
  express.static(
    resolve(
      process.cwd(),
      isDev ? 'public/images' : 'build/roshpinahzinc/public/images',
    ),
  ),
);
app.use(
  '/sounds',
  express.static(
    resolve(
      process.cwd(),
      isDev ? 'public/sounds' : 'build/roshpinahzinc/public/sounds',
    ),
  ),
);
app.use(
  '/applications',
  express.static(
    resolve(
      process.cwd(),
      isDev ? 'public/applications' : 'build/roshpinahzinc/public/applications',
    ),
  ),
);
app.use(
  '/static',
  express.static(
    resolve(
      process.cwd(),
      isDev ? 'public/static' : 'build/roshpinahzinc/public/static',
    ),
  ),
);

// Catch-all for iframe SPA
app.get('/public/*', (req, res) => {
  const filePath = isDev
    ? 'public/index.html'
    : 'build/roshpinahzinc/public/index.html';
  res.sendFile(resolve(process.cwd(), filePath));
});

// Webpack dev middleware
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// Host and port setup
const customHost = argv.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';

// Use gzipped JavaScript
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Production static serving for parent app
if (process.env.NODE_ENV === 'production') {
  // Serve parent app
  app.use(express.static(resolve(process.cwd(), 'build')));

  // Catch-all for parent SPA
  app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'build/index.html'));
  });
}

// Start server
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
