import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
});

//cartsSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model("carts", cartsSchema);

export default cartModel;
