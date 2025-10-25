import express from "express";
import { Router
 } from "express";
import Dealsdb from "../models/Dealsdb.js";
const dealr=Router();

dealr.post('/api/deals',async (req,res) => {
    const {_id,name,price,image}=req.body;

      try {
      const newdeal = new Dealsdb({
        _id,
        name,
        price,
        image,
      });
    
      await newdeal.save();
      res.json({ message: "Product added" });
    } catch (err) {
      res.status(500).json({ message: "Error saving product", error: err.message });
    }


})
dealr.get('/api/deals',async (req,res)=>{
     try {
       const alldeals = await Dealsdb.find();
       res.json(alldeals);
     } catch (err) {
       res.status(500).json({ message: "Error fetching products", error: err.message });
     }




})
export default dealr;
