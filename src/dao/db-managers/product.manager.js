import productModel from "../db-models/product.model.js";

export default class ProductManager {
  constructor() {
    console.log("Working with product using MongoDB");
  }

  getProducts = async (page) => {
    // const pagination = await productModel.paginate();
    // const products = productModel.Product;
    // const hasNextPage = pagination.hasNextPage;
    const products = productModel.find().lean();
    return products;
  };

  create = async (product) => {
    const result = await productModel.create(product);
    return result;
  };

  delete = async (prodId) => {
    const result = await productModel.deleteOne(prodId);
    return result;
  };

  getOneProd = async (prodId) => {
    const result = await productModel.find(prodId).lean();
    return result;
  };
}
