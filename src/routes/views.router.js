import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";
import { MessageManager } from "../dao/index.js";

const router = Router();

let products = [];

router.get("/real-time-products", async (req, res) => {
  let prodManager = new ProductManager();
  let products = await prodManager.getProducts();
  let messageManager = new MessageManager();
  let messages = await messageManager.getMessages();
  res.render("real_time_products", { products: products });
});

router.get("/chat", async (req, res) => {
  let messageManager = new MessageManager();
  let messages = await messageManager.getMessages();
  res.render("chat", { messages: messages });
});

export default router;
