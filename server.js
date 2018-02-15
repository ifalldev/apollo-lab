import express from 'express';
import { createServer } from 'http';

import cons from './config/cons';

import './config/db';
import middleware from './config/middleware';
import mocks from './mocks';

const app = express();

middleware(app);

const graphQLServer = createServer(app);

mocks().then(() => {
  app.listen(cons.PORT, err => {
    if (err) return console.log('server error: ', err);
    console.log('server is listening on port', cons.PORT);
  });
});