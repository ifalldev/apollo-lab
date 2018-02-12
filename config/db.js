import { mongoose } from "mongoose";

import cons from './cons';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

try {
  mongoose.connect(cons.DB_URL, {
    useMongoClient: true,
  });
} catch(err) {
  mongoose.createConnection(cons.DB_URL, {
    useMongoClient: true,
  })
}

mongoose.connection
  .once('open', () => console.log('connected to mLab'))
  .on('error', e => {
    throw e;
  });