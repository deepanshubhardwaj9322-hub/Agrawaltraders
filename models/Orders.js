import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
       image: String,
    quantity:Number,
      },
    ],
    total:Number,
    createdAt: { type: Date, default: Date.now },
  
});

export default mongoose.model("Orders", orderSchema);
