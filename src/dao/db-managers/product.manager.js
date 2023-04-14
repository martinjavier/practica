import productModel from "../db-models/product.model.js";

export default class ProductManager {
  constructor() {
    console.log("Working with product using MongoDB");
  }

  // POSTMAN GET http://localhost:8080/api/products
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

  // POSTMAN POST http://localhost:8080/api/products { "title":"Decimo","description":"Descripción Decimo", "code":"abc110","price":1000,"status":true, "stock":1000, "category":"Decimo", "thumbnails":[] }
  create = async (product) => {
    const result = await productModel.create(product);
    return result;
  };

  // POSTMAN DELETE http://localhost:8080/api/products/642c95222f2ec4bf4a7b4930
  delete = async (prodId) => {
    const result = await productModel.deleteOne(prodId);
    return result;
  };

  // POSTMAN GET http://localhost:8080/api/products/64266458ef82d358d9ac3ea4
  getOneProd = async (prodId) => {
    const product = await productModel.findOne(prodId);
    return product;
  };
}
