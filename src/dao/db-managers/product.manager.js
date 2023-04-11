import productModel from "../db-models/product.model.js";

export default class ProductManager {
  constructor() {
    console.log("Working with product using MongoDB");
  }

  getProducts = async (page, limit) => {
    if (limit === undefined) {
      limit = 3;
    } else {
      limit = limit;
    }
    if (page === undefined) {
      page = 1;
    } else {
      page = page;
    }
    //const products = productModel.find().limit(limit).skip(page);

    const products = await productModel.paginate(
      {},
      {
        limit: limit,
        lean: true,
        page: page ?? 1,
      }
    );

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
