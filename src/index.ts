import {ApolloServer, gql} from 'apollo-server';
import "dotenv/config"
import {merge} from 'lodash'
import { connectToDb } from './config/db';
import { productResolvers, userResolvers } from './resolvers';
import { productTypeDefs, userTypeDefs } from './typedefs';

connectToDb();

const port = 8080;
const server = new ApolloServer({
    typeDefs: [
        userTypeDefs,
        productTypeDefs
    ], 
    resolvers: merge(userResolvers, productResolvers)
});

server.listen({port}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});