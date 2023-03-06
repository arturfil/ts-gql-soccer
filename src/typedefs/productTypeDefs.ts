import { gql } from "apollo-server";

export const productTypeDefs = gql`
    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        created_at: String
        updated_at: String
    }

    input ProductInput {
        name: String!
        stock: Int!
        price: Float!
    }

    type Query {
        createProduct(input: ProductInput): Product
    }
`