import express from 'express';
import bodyParser from 'body-parser';

import cons from './config/cons';

const app = express();

app.use(bodyParser.json());

app.listen(cons.PORT, err => {
  if(err)  return console.log('server error: ', err);
  console.log('server is listening on port', cons.PORT);
})