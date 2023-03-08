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

    type Query {
        getProducts: [Product]
        getProductById(id: String): Product
    }

    input CreateProductInput {
        name: String!
        stock: Int!
        price: Float!
    }
    
    input UpdateProductInput {
        name: String
        stock: Int
        price: Float
    }

    type Mutation {
        createProduct(input: CreateProductInput): Product
        updateProduct(id: ID!, input: UpdateProductInput): Product
        deleteProduct(id: ID!): String
    }
`