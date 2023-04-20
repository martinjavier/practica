import { Router } from "express";
import { UserModel } from "../dao/db-models/user.model.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

// Rutas de Autenticación
router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    successRedirect: "/profile",
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario Registrado");
  }
);

router.get("/failure-signup", (req, res) => {
  res.send("No fue posible registrar al usuario");
});

router.post(
  "/login",
  passport.authenticate("loginStrategy", {
    successRedirect: "/products",
    failureRedirect: "/api/sessions/login-failed",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }
    req.session.userId = req.user._id;
    res.redirect("/profile");
  }
);

router.get("/login-failed", (req, res) => {
  //res.send({ error: "Failed login" });
  res.redirect("/login");
});

router.post("/forgot", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      user.password = createHash(password);
      const userUpdate = await UserModel.findOneAndUpdate(
        { email: user.email },
        user
      );
      return res.send("Contraseña Actualizada");
    } else {
      return res.send(
        `Usuario no está registrado <a href="/signup">Signup</a>`
      );
    }
  } catch (error) {
    return res.send("No se pudo restaurar la contraseña");
  }
});

router.get("/logout", async (req, res) => {
  req.logOut((error) => {
    if (error) {
      return res.send("No se pudo cerrar la sesión");
    } else {
      req.session.destroy((err) => {
        if (err) {
          res.send("No se pudo cerrar la sesión");
        } else {
          //res.send("Sesión Finalizada");
          res.redirect("/login");
        }
      });
    }
  });
});

export { router as authRouter };
