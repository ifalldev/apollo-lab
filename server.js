import express from 'express';
import bodyParser from 'body-parser';

const app = express();


app.listen(4000, () => {
  console.log('server is listening on 4000 port');
})