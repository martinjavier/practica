import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";

const router = Router();

let products = [];

router.get("/real-time-products", async (req, res) => {
  let prodManager = new ProductManager();
  let products = await prodManager.getProducts();
  res.render("real_time_products", { products: products });
});

export default router;
