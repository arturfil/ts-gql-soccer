import { createProduct } from './product';
import { getUser, signInUser, signUpUser } from './user';

export const resolvers = {
    Query: {
        getUser,
        createProduct
    },

    Mutation: {
        signUpUser,
        signInUser
    },
} 