const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT
const mongoose = require("mongoose")
const userRouter = require("./controllers/user")

const app = express()


/////////////////////////////
// Middleware
/////////////////////////////
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))
app.use('/user',userRouter)

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
    isScary: Boolean,
    lifeExpectancy: Number
})

const Animal = model("animal",animalSchema)


//////////////////////////////
//ROUTES
//////////////////////////////

//SEED route - Empty and populate database w seed data
app.get("/animals/seed",(req,res) =>{
    const startAnimals =[
        {name: "Elephant", color:"gray", isScary: false, lifeExpectancy: 48},
        {name: "Scorpion", color:"brown", isScary: true, lifeExpectancy: 3},
        {name: "Brown Bear", color:"brown", isScary: true, lifeExpectancy: 25}
    ]
    Animal.deleteMany({},(err,data) => {
        Animal.create(startAnimals,(err,createdAnimals) => {
            res.json(createdAnimals)
        })
    })
})

//Index route 
app.get("/animals/",(req,res)=>{
    //Get all animals from Mongo
    Animal.find({})
    .then((animals)=>{
        res.render("animals/index.ejs",{animals})
    })
})

//NEW route
app.get("/animals/new",(req,res)=>{
    res.render("animals/new.ejs")
})



//DELETE Route
app.delete("/animals/:id",(req,res)=>{
    Animal.findByIdAndDelete(req.params.id,(err,deletedAnimal)=>{
        console.log(err, deletedAnimal)
        res.redirect('/animals')
    })
})

//UPDATE ROUTE
app.put("/animals/:id",(req,res)=>{
    console.log(`UPDATE ROUTE: THE ID IS ${req.params.id}`)
    req.body.isScary = req.body.isScary === 'on' ? true : false
    Animal.findByIdAndUpdate(req.params.id, req.body, {new:true},(error,updatedAnimal)=>{
        res.redirect(`/animals/${req.params.id}`)
    })
})

//CREATE route
app.post("/animals",(req,res)=>{
    req.body.isScary = req.body.isScary === 'on' ? true : false
    Animal.create(req.body, (err, createdAnimal) =>{
        res.redirect("/animals")
        console.log(createdAnimal)
    })
})

//EDIT route
app.get("/animals/:id/edit",(req,res)=>{
    Animal.findById((req.params.id),(err, foundAnimal)=>{
        res.render('animals/edit.ejs',{foundAnimal})
        console.log(`EDIT ROUTE Current Animal id is: ${req.params.id}`)
    })
})


//SHOW Route
app.get("/animals/:index",(req,res)=>{
    Animal.findById(req.params.index)
    .then((animal)=>{
        res.render('animals/show.ejs',{
        animal:animal,
        index:req.params.index
        })
    })
})

//LISTENER
app.listen(PORT, ()=> console.log(`ANIMAL WORLD listening at ${PORT}`))