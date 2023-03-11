import {ApolloServer, gql} from 'apollo-server';
import "dotenv/config"
import {merge} from 'lodash'
import jwt from 'jsonwebtoken';
import { connectToDb } from './config/db';
import { clientResolvers, orderResolvers, productResolvers, userResolvers } from './resolvers';
import { productTypeDefs, userTypeDefs } from './typedefs';
import { clientTypeDefs } from './typedefs/clientTypeDefs';
import { orderTypeDefs } from './typedefs/orderTypeDefs';

connectToDb();

const port = process.env.PORT || 8081;
const server = new ApolloServer({
    typeDefs: [
        userTypeDefs,
        productTypeDefs,
        clientTypeDefs,
        orderTypeDefs
    ], 
    resolvers: merge(
        userResolvers, 
        productResolvers, 
        clientResolvers, 
        orderResolvers
    ),
    context: ({req}) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const jwtObj: {id: string, iat: number, exp: number} | any = jwt.verify(token, process.env.SECRET_KEY!);
                return jwtObj;
            } catch (error) {
                console.log(error);
            }
        }
    }
});

server.listen({port}).then(({url}) => {
    console.log(`Server ready at ${url}`);
});
