import { ObjectId } from "mongoose";
import jwt from 'jsonwebtoken';

export const createToken = (id: ObjectId) => 
    jwt.sign({id}, process.env.SECRET_KEY!, {expiresIn: "24h"});