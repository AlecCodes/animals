const mongoose = require("mongoose")

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


module.exports = mongoose