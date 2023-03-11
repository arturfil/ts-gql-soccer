import { model, ObjectId, Schema, Types } from "mongoose";

export interface Client {
    _id?: ObjectId;
    name: string;
    last_name: string;
    company: string;
    email: string;
    phone: string;
    vendor:  ObjectId
    created_at: Date;
    updated_at: Date;
}

const ClientSchema = new Schema<Client>({
    name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    company: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    phone: {type: String, required: true, trim: true},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
    vendor: {type: Types.ObjectId, ref: "User"},

});

export default model<Client>("Client", ClientSchema);