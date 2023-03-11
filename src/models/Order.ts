import { model, ObjectId, Schema, Types } from "mongoose";

export interface Order {
    order: Array<any>;
    total: number;
    client: ObjectId;
    vendor: ObjectId;
    status: string;
    created_at: Date;
    updated_at: Date;
}

const OrderSchema = new Schema<Order>({
    order: {type: <any>[], required: true},
    total: {type: Number, required: true},
    status: {type: String, default: "PENDING", enum: ["PENDING", "COMPLETED", "CANCELLED"]},
    client: {type: Types.ObjectId, required: true, ref: "Client"},
    vendor: {type: Types.ObjectId, required: true, ref: "User"},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
});

export default model<Order>("Order", OrderSchema);