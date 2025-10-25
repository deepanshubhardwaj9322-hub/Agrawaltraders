import { Router } from "express";
import Orders from "../models/Orders.js";
import jwt from "jsonwebtoken";

const Ord=Router();

Ord.post("/api/Finalorder",async (req,res)=>{
 
  try {
const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "secretkey"); 
    const username = decoded.username;

    const { items, total } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const newOrder = new Orders({
      user: username,
      items,
      total,
    });

    await newOrder.save();

    res.json({ message: "Order submitted successfully", order: newOrder });

  

} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Error saving product", error: err.message });
} 

}



)

Ord.get("/api/Finalorder", async (req, res) => {
  try {
  const allorder = await Orders.find().sort({ createdAt: -1 });
  res.json(allorder);
} catch (err) {
  res.status(500).json({ message: "Error fetching products", error: err.message });
}
});
Ord.delete("/api/Finalorder/:id", async (req, res) => {
  const {id}=req.params
  try {
    await Orders.findByIdAndDelete(id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});
Ord.get("/api/myorders", async (req, res) => {
  try {
   
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    
    const decoded = jwt.verify(token, "secretkey");
    const username = decoded.username;

    
    const orders = await Orders.find({ user: username }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});
export default Ord;
