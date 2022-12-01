const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

////////////////////////////////
//Create Router
////////////////////////////////
const router = express.Router()

//////////////////////////////
//ROUTES
//////////////////////////////


router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs")
})

module.exports = router