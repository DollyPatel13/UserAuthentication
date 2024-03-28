console.log("Welcome!!!!!");

import express from "express";

import mongoose from "mongoose";

import MongoStore from "connect-mongo";

import session from "express-session";

import isValidUser from "./middlewares/validate.js";

import router from "./routes/routes.js";

import {} from 'dotenv/config';

const uri = process.env.MONGO_URI

const PORT = process.env.PORT || 8080
//Mongoose connection
// const uri =
//   "mongodb+srv://dollypatel280501:diMBr4zJtUPzJFlh@cluster0.n1povoz.mongodb.net/CostcoUsers?retryWrites=true&w=majority";

// Creates a seession store
const session_store = MongoStore.create({
  mongoUrl: uri,
  dbName: "CostcoUsers",
  collectionName: "CostcoSessions",
});

const app = express();

app.use(express.urlencoded({extended:true}))


app.set("view-engine", "ejs");

app.use(express.static("public"));

// Create a session object
app.use(
  session({
    secret: "A secret Key to sign the cookie",
    saveUninitialized: false,
    resave: false,
    store: session_store,
  })
);

app.listen(PORT, () => {
  console.log(`App is listening at Port ${PORT}!!!`);
});

//Route for the Home Page
// app.get("/home", (req, res) => {
//   res.render("home.ejs");
// });

//Route for the login Page
// app.get("/login", (req, res) => {
//   req.session.isValid = true;

//   console.log(req.session);

//   console.log(req.session.id);

//   res.render("login.ejs");
// });

//Adding middleware to dashboard route 
//To restrict the user from accessing the dashboard Page
//Only the logged in users having session will be visiting the dashboard page

//Route for the Dashboard Page
// app.get("/dashboard", isValidUser, (req, res) => {
//   res.render("dashboard.ejs");
// });

// app.post('/logout',(req,res)=>{
//     req.session.destroy((err)=>{
//         if(err) throw err

//         res.redirect('/home')
//     })
// })

app.use('/',router)

app.get('/test',(req,res)=>{
  res.render("test.ejs")

  req.session.user ="Johnson"
  
  req.session.age = 20
  console.log(req.session)

  delete req.session.age
  console.log(req.session)
  
})

export default session