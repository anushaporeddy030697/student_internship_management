const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {ObjectId} = mongoose.Schema.Types


const jobSchema = mongoose.Schema({
    companyid:{
        type:String,
        required:true,
        trim:true
    },
    companyname:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    worktype:{
        type:String,
        required:true,
        trim:true,   
    },
    emptype:{
        type:String,
        required:true,
        trim:true,   
    },
    empbenefits:{
        type:String,
        required:true,
        trim:true,   
    },
    requirements:{
        type:String,
        required:true,
        trim:true,    
    },
   
    yoe:{
        type:Number,
        default:0,
       
    },
    postedby:{
        type:ObjectId,
        ref:'company'
    }, 
    aboutcompany:{
        companyData: Buffer,
        contentType: String
    }
    
})

//userdef function for hiding private data
jobSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    return userObj
} 


//creating a job model
const job = mongoose.model('job',jobSchema)

module.exports=job