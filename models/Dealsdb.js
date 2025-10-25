import mongoose from "mongoose";

const dealsSchema = new mongoose.Schema({
        _id:String,
        name: String,
        price: Number,
       image: String,

      
    
  
});

export default mongoose.model("Dealsdb", dealsSchema);
