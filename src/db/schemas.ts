import { gql } from "apollo-server";

// Schema
export const typeDefs = gql`
    type Field {
        name: String
        address: String
    }

    type Technology {
        name: String
    }

    type Query {
        getFields: [Field]
    }

    type Query {
        getTech: [Technology]
    }
`