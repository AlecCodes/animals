const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const PORT = process.env.PORT

const app = express()


/////////////////////////////
// Middleware
/////////////////////////////
app.use(morgan("tiny"))


app.listen(PORT, ()=> console.log(`ANIMAL WORLD listening at ${PORT}`))