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

    input CreateClientInput {
        name: String!
        last_name: String!
        company: String!
        email: String!
        phone: String!
    }
   
    input UpdateClientInput {
        name: String
        last_name: String
        company: String
        email: String
        phone: String
    }

    type Query {
        getClients: [Client]
    }

    type Query {
        getClientsByVendor: [Client]
    }

    type Query {
        getClientById(id: String): Client
    }

    type Mutation {
        createClient(input: CreateClientInput): Client
    }

    type Mutation {
        updateClient(id: String, input: UpdateClientInput): Client
    }

    type Mutation {
        deleteClient(id: String): String
    }


`