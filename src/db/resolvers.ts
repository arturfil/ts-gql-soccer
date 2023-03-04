import { UserInput } from "../interfaces/UserInput";
import User from "../models/User";
import bcryptjs from 'bcryptjs';

interface createUser {
    input: UserInput;
}

export const resolvers = {
    Query: {
        getFields: () => "All fields to play soccer"
    },

    Mutation: {
        newUser: async (_: any, {input}: {input: UserInput}) => {
            const {email, name, password} = input;
            const userExists = await User.findOne({email});

            if (userExists) throw new Error("user is already registered");

            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

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
    }
} 