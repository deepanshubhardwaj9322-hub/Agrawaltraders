import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Router } from "express";
const userl=Router();


userl.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password, hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});
userl.get("/api/register", async (req, res) => {
  try {
  const alluser = await User.find();
  res.json(alluser);
} catch (err) {
  res.status(500).json({ message: "Error fetching users", error: err.message });
}
});

userl.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id, username: user.username }, "secretkey", { expiresIn: "2000d" });
  res.json({ message: "Login successful", token });
});
userl.put("/api/register/:id", async (req, res) => {
  const { username } = req.body;
  try {
    
  
  await User.findByIdAndUpdate(req.params.id, { username });
  res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ message: "Error editing users", error: error.message });
  }
});


userl.delete("/api/register/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});
export default userl;