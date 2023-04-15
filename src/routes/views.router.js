import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";
import { MessageManager } from "../dao/index.js";

const router = Router();

let products = [];

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/api/sessions/login", async (req, res) => {
  res.render("login");
});

router.get("/api/sessions/signup", async (req, res) => {
  res.render("signup");
});

router.get("/api/sessions/profile", async (req, res) => {
  res.render("profile");
});

router.get("/real-time-products", async (req, res) => {
  let prodManager = new ProductManager();
  let { page, limit } = req.query;
  let products = await prodManager.getProducts(page, limit);
  res.render("real_time_products", { products: products });
});

router.get("/product/:id", async (req, res) => {
  let prodManager = new ProductManager();
  let prodId = req.params.id;
  let products = await prodManager.getOneProd(prodId);
  res.render("oneproduct", { products: products });
});

router.get("/cart/:id", async (req, res) => {
  let cartManager = new CartManager();
  let cartId = req.params.id;
  let carts = await cartManager.getOneCart(cartId);
  console.log("Cart: " + carts);
  res.render("onecart", { carts: carts });
});

router.get("/real-time-carts", async (req, res) => {
  let prodManager = new ProductManager();
  let products = await prodManager.getProducts();
  let cartManager = new CartManager();
  let carts = await cartManager.getCarts();
  res.render("real_time_carts", { carts: carts });
});

router.get("/chat", async (req, res) => {
  let messageManager = new MessageManager();
  let messages = await messageManager.getMessages();
  res.render("chat", { messages: messages });
});

export default router;
