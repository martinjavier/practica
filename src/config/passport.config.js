import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../dao/db-models/user.model.js";
import { createHash } from "../utils.js";
import { isValidPassword } from "../utils.js";
import session from "express-session";

const initializedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { name, age } = req.body;
          const user = await UserModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          const newUser = {
            name,
            age,
            email: username,
            password: createHash(password),
          };
          const userCreated = await UserModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "loginStrategy",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (!user) {
            console.log(`User with email ${username} not found`);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // SERIALIZAR y DESERIALIZAR USUARIOS
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    return done(null, user); // => req.user = user
  });
};

export { initializedPassport };
