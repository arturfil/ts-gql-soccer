import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { AuthInput, UserInput } from "../interfaces";
import User from "../models/User";
import { Schema } from "mongoose";
import { createToken } from "../helpers/jwtHelpers";

export const getUser = async (_: any, {token}: {token: string}) => {
    const response:any|JwtPayload = jwt.verify(token, process.env.SECRET_KEY!);
    const {id} = response;
    const user = User.findById(id);
    return user;
}

export const signUpUser = async (_: any, {input}: {input: UserInput}) => {
    const {email, name, password} = input;
    const userExists = await User.findOne({email});

    if (userExists) throw new Error("user is already registered");

    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(password, salt);

    try {
        // create user
        const newUser = new User(input);
        console.log(newUser);

        newUser.save();
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export const signInUser = async (_: any, {input}: {input: AuthInput}) => {
    const {email, password} = input;
    const userExists = await User.findOne({email});
    if (!userExists) throw new Error("User doesn't exist");
    const validUser = await bcrypt.compare(password, userExists.password);
    if (!validUser) throw new Error("Password doesn't match");
    const token = createToken(userExists._id);
    return {token};
}
