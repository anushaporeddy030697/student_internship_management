const mongoose = require("mongoose")
const validator=require("validator")

const {ObjectId} = mongoose.Schema.Types


const qualifiedSchema = mongoose.Schema({
    jobid:{
        type:ObjectId,
        ref:'job'
    },
    studentid:{
        type:ObjectId,
        ref:'Student'
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:false,
        trim:true,
        lowercase:true,
    },
    
    age:{
        type:Number,
        default:0,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    universityid:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
       
    },
    resume:{
        resumeData: Buffer,
        contentType: String
    }
   
})
 
//userdef function for hiding private data
qualifiedSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    return userObj
} 


//creating a company model
const qualified = mongoose.model('qualified',qualifiedSchema)

module.exports=qualified     