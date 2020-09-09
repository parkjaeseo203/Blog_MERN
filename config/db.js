
const mongoose = require('mongoose')



const dbAdress = "mongodb+srv://bangnany:4275@cluster0.b5xqd.mongodb.net/Blog_MERN?retryWrites=true&w=majority"
const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAdress, dbOption)
    .then(() => console.log('MongDB connected'))
    .catch(err => console.log(err))
