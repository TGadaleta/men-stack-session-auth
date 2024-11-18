import express from "express";
import bcrypt from 'bcrypt';

import User from "../models/user.js";
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

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  
router.post("/sign-in", async (req, res) => {
    try {
        //check if user is in the database
        const {username, password} = req.body;
        const user = await User.findOne({username: username})
        if (!user){
            throw new Error('User does not exist');
        }
        //compare provided and stored password
        const validPassword = bcrypt.compareSync(
            password,
            user.password
        )
        if(!validPassword){
            throw new Error('Password is incorrect')
        }
        //create session
        req.session.user = {
            username: user.username
        }
        res.status(200).redirect('/')
    } catch (error) {
        console.error(error)
    }
})

router.get("/sign-out", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})


export default router;
