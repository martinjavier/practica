import productModel from "../db-models/product.model.js";

export default class ProductManager {
  constructor() {
    console.log("Working with product using MongoDB");
  }

  getProducts = async () => {
    const products = await productModel.find().lean();
    return products;
  };

  create = async (product) => {
    const result = await productModel.create(product);
    return result;
  };

  /*
  addProduct = async (cartId, productId) => {
    const cart = await cartModel.findById(cartId);
    cart.products.push({ productId });
    return cart.save();
  };
  */
}
