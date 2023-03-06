import { ProductInput } from "../interfaces/ProductInput";
import Product from "../models/Product";

export const createProduct = async (_: any, {input}: {input: ProductInput}) =>{ 
    try {
        const newProduct = new Product(input);
        const result = await newProduct.save();
        return result;
    } catch (error) {
        console.log(error);
    }
}