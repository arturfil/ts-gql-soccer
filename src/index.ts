import {ApolloServer, gql} from 'apollo-server';
import { resolvers, typeDefs } from './db';

const server = new ApolloServer({typeDefs, resolvers});
const port = 8080;

server.listen({port}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});
