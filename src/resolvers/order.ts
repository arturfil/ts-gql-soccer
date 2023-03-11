import { ObjectId } from "mongoose";
import { OrderInput } from "../interfaces";
import Client from "../models/Client";
import Order from "../models/Order";
import Product from "../models/Product";

export const resolvers = {
    Query: {

    },
    Mutation: {
        newOrder: async (_: any, {input}: {input: OrderInput}, ctx: {id: ObjectId}) => {
            let client = await Client.findById(input.client);
            if (!client) throw new Error("Client not found");            
            
            if (client.vendor.toString() !== ctx.id.toString()) {
                throw new Error("Not Authorized to make this order");
            } 
            // check that the number of products doesn't exceed the stock number of that product
            input.order.forEach(async product => {
                const {id} = product;
                const productToAdd = await Product.findById(id);
                if (product.number > productToAdd?.stock!) {
                    throw new Error("Number of product added to cart is larger than the available stock");
                } else {
                    productToAdd!.stock = productToAdd?.stock! - Number(product.number);
                    await productToAdd?.save();
                }
            });
            
            let totalSum = 0;
            for await (let product of input.order) {
                let productToAdd = await Product.findById(product.id);
                totalSum += Number(product.number) * productToAdd?.price!
            }
            totalSum = Number(totalSum.toFixed(2));
            console.log("TOT SUM", totalSum);
            
            const order = new Order(input);
            order.vendor = ctx.id;
            order.total = totalSum;
            await order.save();
            return order;
        }
    }
}