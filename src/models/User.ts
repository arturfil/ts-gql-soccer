import { model, ObjectId, Schema } from "mongoose";

export interface User {
    _id?: ObjectId,
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "admin"]},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()}
});

export default model<User>("User", UserSchema);