import cartModel from "../db-models/cart.model.js";

export default class CartManager {
  constructor() {
    console.log("Working with carts using MongoDB");
  }

  getCarts = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  create = async (cart) => {
    const result = await cartModel.create(cart);
    return result;
  };

  addProduct = async (cartId, productId) => {
    const cart = await cartModel.findById(cartId);
    cart.products.push({ productId });
    return cart.save();
  };
}
