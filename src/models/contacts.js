const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        
    },
    message:{
        type:String,
        required:true,
        trim:true
    }
  
})


//creating a contact model
const contact = mongoose.model('contact',contactSchema)

module.exports=contact