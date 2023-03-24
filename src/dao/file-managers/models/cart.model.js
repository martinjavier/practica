import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
});

const cartModel = mongoose.model("carts", cartsSchema);

export default cartModel;
