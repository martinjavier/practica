import { Router } from "express";

const router = Router();

// Rutas de las vistas
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

export { router as webRouter };
