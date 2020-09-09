
const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required:true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String
        },
        role:{
            type: String,
            default: "user"
        },
        resetPasswordLink:""
    },
    {
        timestamps: true
    }
)





module.exports = mongoose.model('user', userSchema)