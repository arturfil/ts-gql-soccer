import { gql } from "apollo-server";

export const clientTypeDefs = gql`
    type Client {
        id: ID
        name: String
        last_name: String
        company: String
        email: String
        phone: String
        vendor: ID
        created_at: String
        updated_at: String
    }

    input ClientInput {
        name: String!
        last_name: String!
        company: String!
        email: String!
        phone: String!
    }

    type Query {
        getClients: [Client]
    }

    type Query {
        getClientsByVendor(id: String): [Client]
    }

    type Mutation {
        createClient(input: ClientInput): Client
    }
`