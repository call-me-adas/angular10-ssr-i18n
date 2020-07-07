
const express = require('express');
const path = require('path');

function app() {
  const server = express();

  const appServerModule = require(path.join(__dirname, 'dist', 'server', 'en', 'main.js'));
  server.get('/', appServerModule.app('en'));

  ['pl'].forEach((locale) => {
    const appServerModule = require(path.join(__dirname, 'dist', 'server', locale, 'main.js'));

    server.use(`/${locale}`, appServerModule.app(locale));
  });



  // server.get('/', (req, res) => {
  //   res.redirect('en');
  // });
  // req.headers["accept-language"]

  return server;
}

function run() {
  app().listen(4200, () => {
    console.log(`Node Express server listening on http://localhost:4200`);
  });
}

run();
