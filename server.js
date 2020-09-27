
const express = require('express')
const BP = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const app = express()

const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')

require('./config/db')


app.use(morgan('dev'))
app.use(BP.json())
app.use(BP.urlencoded({ extended: false}))

app.use(passport.initialize())


require('./config/passport')(passport)




app.use('/user', userRoute)
app.use('/profile', profileRoute)


const port = 7524


app.listen(port, () => console.log(`server started at ${port}`))