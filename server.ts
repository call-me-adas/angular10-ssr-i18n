import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as path from "path";

// The Express app is exported so that it can be used by serverless Functions.
export function app(locale) : express.Express {
  const server = express();

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  const distPath = join(process.cwd(), `dist/browser/${locale}`);

  //server.set('views', distPath);
  //server.set('view engine', 'html');

  server.get(
    '*.*',
    express.static(distPath, {
      maxAge: '1y',
    })
  );

  server.get('*', (req, res) => {
    res.render(join(distPath, 'index.html'), {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

export * from './src/main.server';
