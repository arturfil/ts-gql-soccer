import { gql } from "apollo-server";

export const orderTypeDefs = gql`
    type Order { 
        id: ID
        order: [ProductOrder]
        total: Float
        client: ID
        vendor: ID
        status: String
        created_at: String
        updated_at: String
    }
    
    enum OrderStatus {
        PENDING
        COMPLETED
        CANCELLED
    }

    type ProductOrder {
        id: ID
        number: Int
    }

    input ProductInput {
        id: ID!
        number: Int!
    }

    input OrderInput {
        order: [ProductInput]
        total: Float
        client: ID!
        status: OrderStatus
    }

    type Query {
        getOrders: [Order]
    }

    type Query {
        getOrdersByVendor: [Order]
    }

    type Query {
        getOrderById(id: ID!): Order
    }

    type Mutation {
        newOrder(input: OrderInput): Order
    }

    type Mutation {
        updateOrder(id: String!, input: OrderInput): Order
    }
`
