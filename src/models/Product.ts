import { Schema, model } from "mongoose";

export interface Product {
    name: string;
    stock: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}

const ProductSchema = new Schema<Product>({
    name: {type: String, required: true, trim: true},
    stock: {type: Number, required: true},
    price: {type: Number, required: true},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()}
});

export default model<Product>('Product', ProductSchema);