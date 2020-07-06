
const express = require('express');
const path = require('path');

function app() {
  const server = express();

  ['en', 'pl'].forEach((locale) => {
    console.log(path.join(__dirname, 'dist', 'server', locale, 'main.js'));
    const appServerModule = require(path.join(__dirname, 'dist', 'server', locale, 'main.js'));
    server.use(`/${locale}`, appServerModule.app(locale));
  });

  return server;
}

function run() {
  app().listen(4200, () => {
    console.log(`Node Express server listening on http://localhost:4200`);
  });
}

run();
