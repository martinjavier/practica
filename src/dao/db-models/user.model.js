import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});

export const UserModel = mongoose.model(userCollection, userSchema);
