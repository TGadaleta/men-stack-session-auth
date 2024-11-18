import express from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  try {
    //Grab form data from req.body
    let { username, password, confirmPassword } = req.body;

    //validate password and confirm field match
    if (password!=confirmPassword){
        throw new Error("Passwords don't match.")
    }
    //validate complexity of password
    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/.test(password)){
        throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    }
    //check if username provided already exists
    const existingUser = await User.findOne({username: username})
    if (existingUser){
        throw new Error(`User ${username} already exists.`)
    }
    //encrypt password
    password = bcrypt.hashSync(password, 10)
    //creates new user
    const newUser = await User.create({username,password})
    if(newUser) {
        res.redirect('/auth/sign-in');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
