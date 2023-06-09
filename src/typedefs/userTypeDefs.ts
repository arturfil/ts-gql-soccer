import { gql } from "apollo-server";

export const userTypeDefs = gql`
    type User {
        id: ID
        name: String
        email: String
        role: String
        created_at: String
        updated_at: String
    }

    type Token {
        token: String
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Query {
        getUser(token: String!): User
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        signUpUser(input: UserInput): User
        signInUser(input: AuthInput): Token
    }
`