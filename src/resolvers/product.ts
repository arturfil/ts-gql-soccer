import { ProductInput } from "../interfaces/ProductInput";
import Product from "../models/Product";


export const resolvers = {
    Query: {
        getProducts: async () => { 
            try {
                const products = await Product.find();
                return products
            } catch (error) {
                console.log(error);
            }
        },
        getProductById: async (_: any, {id}: {id: string}) => {
            try {
                const singleProduct = await Product.findById(id);
                return singleProduct;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createProduct: async (_: any, {input}: {input: ProductInput}) =>{ 
            try {
                const newProduct = new Product(input);
                const result = await newProduct.save();
                return result;
            } catch (error) {
                console.log(error);
            }
        },
        updateProduct: async (_: any, {id, input}: {id: string, input: ProductInput}) => {
            let product = await Product.findById(id);
            if (!product) throw new Error("Product doesn't exist on the database");
            try {
                const productToUpdate = Product.findByIdAndUpdate({_id: id}, input, {new: true});
                return productToUpdate;
            } catch (error) {
                console.log(error);
                
            }
        },
        deleteProduct: async (_: any, {id}: {id: string}) => {
            let product = await Product.findById(id);
            if (!product) throw new Error("Product doesn't exist on the database");
            try {
                await Product.findByIdAndDelete(id);
                return "Product was successfully deleted";
            } catch (error) {
                console.log(error);
                
            }
        }
    }
}