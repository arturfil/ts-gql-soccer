import { ObjectId } from "mongoose";

export interface OrderInput {
    order: ProductInput[];
    total: Number;
    client: ObjectId;
    status: OrderStatus;
}

interface ProductInput {
    id: ObjectId
    number: Number;
}

enum OrderStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}