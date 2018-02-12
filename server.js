import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import cons from './config/cons';

import './config/db';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(bodyParser.json());

app.use('/graphiql', graphiqlExpress({
  schema
}))

const graphQLServer = createServer(app)

graphQLServer.listen(cons.PORT, err => {
  if(err)  return console.log('server error: ', err);
  console.log('server is listening on port', cons.PORT);
})