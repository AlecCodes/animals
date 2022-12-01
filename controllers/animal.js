const express = require('express')
//const Animal = require('../models/Animal')

//////////////////////////
//CREATE ROUTER
//////////////////////////
const router = express.Router()


//////////////////////////
//ROUTER MIDDLEWARE This is where we check if user is logged into active session
//////////////////////////
// router.use((req,res,next)=>{
//     if(req.session.loggedIn){
//         next();
//     } else {
//         res.redirect("/user/login")
//     }
// })

//////////////////////////////
//ROUTES
//////////////////////////////

//SEED route - Empty and populate database w seed data
router.get("/animals/seed",(req,res) =>{
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
router.get("/animals/",(req,res)=>{
    //Get all animals from Mongo
    Animal.find({})
    .then((animals)=>{
        res.render("animals/index.ejs",{animals})
    })
})

//NEW route
router.get("/animals/new",(req,res)=>{
    res.render("animals/new.ejs")
})



//DELETE Route
router.delete("/animals/:id",(req,res)=>{
    Animal.findByIdAndDelete(req.params.id,(err,deletedAnimal)=>{
        console.log(err, deletedAnimal)
        res.redirect('/animals')
    })
})

//UPDATE ROUTE
router.put("/animals/:id",(req,res)=>{
    console.log(`UPDATE ROUTE: THE ID IS ${req.params.id}`)
    req.body.isScary = req.body.isScary === 'on' ? true : false
    Animal.findByIdAndUpdate(req.params.id, req.body, {new:true},(error,updatedAnimal)=>{
        res.redirect(`/animals/${req.params.id}`)
    })
})

//CREATE route
router.post("/animals",(req,res)=>{
    req.body.isScary = req.body.isScary === 'on' ? true : false
    Animal.create(req.body, (err, createdAnimal) =>{
        res.redirect("/animals")
        console.log(createdAnimal)
    })
})

//EDIT route
router.get("/animals/:id/edit",(req,res)=>{
    Animal.findById((req.params.id),(err, foundAnimal)=>{
        res.render('animals/edit.ejs',{foundAnimal})
        console.log(`EDIT ROUTE Current Animal id is: ${req.params.id}`)
    })
})


//SHOW Route
router.get("/animals/:index",(req,res)=>{
    Animal.findById(req.params.index)
    .then((animal)=>{
        res.render('animals/show.ejs',{
        animal:animal,
        index:req.params.index
        })
    })
})

//////////////////////////
//export this router
//////////////////////////
module.exports = router