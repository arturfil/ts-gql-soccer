import { Context } from "apollo-server-core";
import { ObjectId } from "mongoose";
import { ClientInput } from "../interfaces/ClientInput";
import Client from "../models/Client";
import User from "../models/User";

export const resolvers = {
    Query: {
        getClients: async () => {
            try {
                const clients = await Client.find()
                return clients;
            } catch (error) {
                console.log(error);
            }
        },
        getClientsByVendor: async (_: any, {}, ctx: {id: string}) => {
            try {
                const { id } = ctx
                const vendor = await User.findById(id);
                if (!vendor) throw new Error("Vendor doesn't exist");
                console.log("found clients");
                const clients = Client.find({vendor: vendor._id});
                return clients;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createClient: async (_: any, {input}: {input: ClientInput}, ctx: {id: ObjectId}) => {
            try {
                const userToCreate = new Client(input);
                userToCreate.vendor = ctx.id
                userToCreate.save();                
                return userToCreate;
            } catch (error) {
                console.log(error);
            }
        }
    }
}