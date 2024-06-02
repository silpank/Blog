const mongoose = require('mongoose');

// schema creation 
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullName: {
        type:String,
        default: ''
    },
    image: {
        data: {
            type: String,
            default: ''
        },
        contentType: {
            type: String,
            default: ''
        }
    },
    dataFilled: {
        type: Boolean,
        default: false
    }
})
const users = mongoose.model("users",userSchema)

module.exports= users   