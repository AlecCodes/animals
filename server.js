const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const mongoose = require("mongoose")
const userRouter = require("./controllers/user")
const animalRouter = require("./controllers/animal")
const app = express()


/////////////////////////////
// Middleware
/////////////////////////////
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))
app.use('/user',userRouter)
app.use(animalRouter)

/////////////////////////////
//DATABASE CONNECTION
/////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//establish our connections
mongoose.connect(DATABASE_URL, CONFIG)

//log connection events from mongoose.
mongoose.connection
    .on("open", ()=> console.log("MONGOOSE CONNECTED"))
    .on("close", ()=> console.log("disconnected?!!"))
    .on("error",(error)=> console.log(error))


//LISTENER
app.listen(PORT, ()=> console.log(`ANIMAL WORLD listening at ${PORT}`))