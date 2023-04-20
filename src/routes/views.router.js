import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";
import { MessageManager } from "../dao/index.js";
import passport from "passport";

const router = Router();

let products = [];

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/profile", async (req, res) => {
  res.render("profile");
});

router.get("/products", async (req, res) => {
  let prodManager = new ProductManager();
  let { page, limit } = req.query;
  let products = await prodManager.getProducts(page, limit);
  res.render("products", {
    products: products,
    user: JSON.stringify(req.session.passport.user),
    name: JSON.stringify(req.user.name),
    email: JSON.stringify(req.user.email),
  });
});

router.get("/product/:id", async (req, res) => {
  let prodManager = new ProductManager();
  let prodId = req.params.id;
  let product = await prodManager.getOneProd(prodId);
  res.render("oneproduct", { product: product });
});

router.get("/cart/:id", async (req, res) => {
  let cartManager = new CartManager();
  let cartId = req.params.id;
  let carts = await cartManager.getOneCart(cartId);
  console.log("Cart: " + carts);
  res.render("onecart", { carts: carts });
});

router.get("/carts", async (req, res) => {
  let prodManager = new ProductManager();
  let products = await prodManager.getProducts();
  let cartManager = new CartManager();
  let carts = await cartManager.getCarts();
  res.render("carts", { carts: carts });
});

router.get("/chat", async (req, res) => {
  let messageManager = new MessageManager();
  let messages = await messageManager.getMessages();
  res.render("chat", { messages: messages });
});

export default router;
