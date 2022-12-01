const mongoose = require('./connection')

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

module.exports = Animal