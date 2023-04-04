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

  delete = async (cartId) => {
    const result = await cartModel.deleteOne(cartId);
    return result;
  };

  getOneCart = async (cartId) => {
    const result = await cartModel.find(cartId).lean();
    return result;
  };

  deleteProd = async (cartId, prodId) => {
    if (!cartId || !prodId) {
      console.log("falta Información");
    } else {
      let prodDeleted = await cartModel.updateOne(
        { _id: cartId },
        { $pull: { products: { id: prodId } } }
      );
      return prodDeleted;
    }
  };
}
