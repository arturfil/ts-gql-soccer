import {ApolloServer, gql} from 'apollo-server';
import { resolvers, typeDefs } from './db';
import "dotenv/config"
import { connectToDb } from './config/db';

connectToDb();

const port = 8080;
const server = new ApolloServer({
    typeDefs, resolvers
});


server.listen({port}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});