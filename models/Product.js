import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: String,
  price: Number,
  image: String, // path to uploaded image
});

export default mongoose.model("Product", productSchema);
