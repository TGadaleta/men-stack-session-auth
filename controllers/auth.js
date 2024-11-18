import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  try {
    //Grab form data from req.body
    const { username, password, confirmPassword } = req.body;

    //validate password and confirm field match
    if (password!=confirmPassword){
        throw new Error("Passwords don't match.")
    }
    //check if username provided already exists
    const existingUser = await User.find({username: username})
    if (existingUser){
        throw new Error(`User ${username} already exists.`)
    }
    //creates new user
    const newUser = await User.create({username,password})
    if(newUser) {
        res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
