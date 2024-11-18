import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import session from "express-session";

import mongoose from "mongoose";
import methodOverride from "method-override";
import morgan from "morgan";

//Custom Module
import authRouter from './controllers/auth.js'

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
//creat sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs", {user: req.session.user});
  });

app.use('/auth', authRouter)


app.listen(port, () => {
  console.log(`The express app is ready on  http://localhost:${port}`);
});
