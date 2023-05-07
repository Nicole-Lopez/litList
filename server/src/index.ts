import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from './schema/resolvers.js';
import { typeDefs } from './schema/typeDefs.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection:true
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server),
);


await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
console.log(`Server ready at http://localhost:${process.env.PORT}`);
