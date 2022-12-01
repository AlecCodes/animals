const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const mongoose = require("mongoose")
const userRouter = require("./controllers/user")
const animalRouter = require("./controllers/animal")
const app = express()
const session = require('express-session')
const MongoStore = require("connect-mongo")

/////////////////////////////
// Middleware
/////////////////////////////
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
  }))
app.use('/user', userRouter)
app.use('/animals', animalRouter)

//HOME ROUTE - for signup and login
app.get("/",(req,res)=>{
    res.render("index.ejs")
})

//LISTENER
app.listen(PORT, ()=> console.log(`ANIMAL WORLD listening at ${PORT}`))
