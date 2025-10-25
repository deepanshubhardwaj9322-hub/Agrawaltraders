import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hashedPassword:{type:String},
  Phonenunmber: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model("User", userSchema);
