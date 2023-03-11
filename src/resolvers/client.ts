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
        },
        getClientById: async (_: any, {id}: {id: string}, ctx: {id: string}) => {
            try {
                const singleClient = await Client.findById(id);
                if (!singleClient) throw new Error("Client doesn't exist");
                if (singleClient.vendor.toString() !== ctx.id) throw new Error("Not authorized for this process");
                return singleClient;
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
        },
        updateClient: async (_: any, {id, input}: {id: string, input: ClientInput}, ctx: {id: string}) => {
            let clientToUpdate = await Client.findById(id);
            if (!clientToUpdate) throw new Error("No client found");
            if (clientToUpdate.vendor.toString() !== ctx.id) {
                throw new Error("Not authorized for this process");
            }
            clientToUpdate = await Client.findByIdAndUpdate({_id: id}, input, {new: true});
            return clientToUpdate;
        },
        deleteClient: async (_: any, {id}: {id: string}, ctx: {id: string}) => {
            let clientToDelete = await Client.findById(id);
            if (clientToDelete == null) throw new Error("Client not found");
            if (clientToDelete.vendor.toString() !== ctx.id) {
                throw new Error("Not authorized for this process");
            }
            await Client.findByIdAndDelete(id);
            return "Client deleted successfully";

        }
    }
}