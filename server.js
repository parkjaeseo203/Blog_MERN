
const express = require('express')
const BP = require('body-parser')
const morgan = require('morgan')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express()


const dbAdress = "mongodb+srv://bangnany:4275@cluster0.b5xqd.mongodb.net/Blog_MERN?retryWrites=true&w=majority"
const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAdress, dbOption)
    .then(() => console.log('MongDB connected'))
    .catch(err => console.log(err))



app.use(morgan('dev'))
app.use(BP.json())
app.use(BP.urlencoded({ extended: false}))



const port = 7524


app.listen(port, console.log('server started'))