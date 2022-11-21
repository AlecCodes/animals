const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const mongoose = require("mongoose")


const app = express()


/////////////////////////////
// Middleware
/////////////////////////////
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))

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

//////////////////////////////
//ANIMAL MODEL
//////////////////////////////
const {Schema, model} = mongoose

const animalSchema = new Schema({
    name: String,
    color: String,
    isScary: Boolean
})

const Animal = model("animal",animalSchema)


//////////////////////////////
//ROUTES
//////////////////////////////

//SEED route - Empty and populate database w seed data
app.get("/animals/seed",(req,res) =>{
    const startAnimals =[
        {name: "Elephant", color:"gray", isScary: false},
        {name: "Scorpion", color:"brown", isScary: true},
        {name: "Brown Bear", color:"brown", isScary: true}
    ]
    Animal.deleteMany({},(err,data) => {
        Animal.create(startAnimals,(err,createdAnimals) => {
            res.json(createdAnimals)
        })
    })

})


//LISTENER
app.listen(PORT, ()=> console.log(`ANIMAL WORLD listening at ${PORT}`))