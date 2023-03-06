import {ApolloServer, gql} from 'apollo-server';
import "dotenv/config"
import { connectToDb } from './config/db';
import { resolvers } from './resolvers';
import { productTypeDefs } from './typedefs/productTypeDefs';
import { userTypeDefs } from './typedefs/userTypeDefs';

connectToDb();

const port = 8080;
const server = new ApolloServer({
    typeDefs: [
        userTypeDefs,
        productTypeDefs
    ], 
    resolvers: resolvers
});


server.listen({port}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});