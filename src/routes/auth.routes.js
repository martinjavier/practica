import { Router } from "express";
import { UserModel } from "../dao/db-models/user.model.js";
import { createHash } from "../utils.js";

const router = Router();

// Rutas de Autenticación
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("EMAIL: " + email);
    console.log("PASSWORD: " + password);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      const newUser = {
        email,
        password: createHash(password),
      };
      const userCreated = await UserModel.create(newUser);
      req.session.user = userCreated.email;
      //res.send("Usuario logueado");
      res.redirect("api/sessions/profile");
    } else {
      res.send(
        `Usuario ya registrado <a href="/api/sessions/login">Inicia Sesión</a>`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send("La sesión no se ha podido cerrar");
    } else {
      res.redirect("/");
    }
  });
});

export { router as authRouter };
