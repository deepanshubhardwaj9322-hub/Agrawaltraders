import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("Mongo connection error:", err));







import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";

import multer from "multer";
import express from "express";
import cors from "cors";    
import fs from "fs";


const app = express()
const port = 3000
app.use(cors());
app.use(express.json());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "temp/" });








app.post("/api/add-product", upload.single("image"), async (req, res) => {
  const { name, price } = req.body;
  let imageurl="";

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageurl = result.secure_url;

     
      fs.unlinkSync(req.file.path);
    } catch (err) {
      return res.status(500).json({ message: "Cloudinary upload failed", error: err.message });
    }
  }
  try {
  const newProduct = new Product({
    name,
    price,
    image: imageurl,
  });

  await newProduct.save();
  res.json({ message: "Product added", product: newProduct });
} catch (err) {
  res.status(500).json({ message: "Error saving product", error: err.message });
}

}
);




app.get("/api/products", async (req, res) => {
  try {
  const allProducts = await Product.find();
  res.json(allProducts);
} catch (err) {
  res.status(500).json({ message: "Error fetching products", error: err.message });
}
});



app.delete("/api/deleteProduct/:id", async (req, res) => {
  const { id } = req.params; 

  try {
  
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});
app.put("/api/updateProduct/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = products.find((p) => Number(p.id) === Number(id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Update only name and price
  if (name) product.name = name;
  if (price) product.price = price;

  res.json({ message: "Product updated successfully", product });
});

import dealr from "./routes/Deals.js";
app.use('/',dealr);
import userl from "./routes/Userlogin.js";
app.use('/',userl);
import Ord from "./routes/Orders.js";
app.use("/",Ord);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
