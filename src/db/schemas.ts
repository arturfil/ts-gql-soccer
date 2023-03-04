import { gql } from "apollo-server";

// Schema
export const typeDefs = gql`
    type User {
        id: ID
        name: String
        email: String
        role: String
        created_at: String
        updated_at: String
    }

    input UserInput {
        name: String
        email: String
        password: String
    }

    type Query {
        getFields: String
    }

    type Mutation {
        newUser(input: UserInput): User
    }
`