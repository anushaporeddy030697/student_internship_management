const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const companySchema = mongoose.Schema({
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
        unique: true,
        required:true,
        trim:true,
        lowercase:true,
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
                   
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
    companyid:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
      
    },
    tokens:[
       {
           token:{
               type:String,
               required:true
           }
       }
    ]
})

//userdef function for hiding private data
companySchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
} 

//userdef function for gen auth token
companySchema.methods.genAuthToken = async function(){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},"thisisseceret",{ expiresIn:"7 days"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

//userdef function for gen auth token
companySchema.methods.genAuthToken = async function(){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},"thisisseceret",{ expiresIn:"7 days"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

//userdef function for authentication
companySchema.statics.findByCredentials = async (email,password) => {
    console.log("data got to database")
    const user = await company.findOne({ email })
    if(!user){
        throw new Error("unable to login")
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        throw new Error("Unable to login")
    }
    return user
}

//userdef function for authentication
companySchema.statics.findByEmail = async (email) => {
    // console.log("erwe")
    const user = await company.findOne({ email })
    console.log(user,"user")
    if(!user){
        throw new Error("unable to find")
    }
    return user
}

//userdef function for authentication
companySchema.statics.findUserById = async (id) => {
    console.log("reached schema")
    const user = await company.findById({_id : id})
    // console.log(user,"user")
    if(!user){
        throw new Error("unable to find")
    }
    return user
}

//using mongoose middleware for hashing passwords
companySchema.pre("save",async function (next) {
    const user =this
    
   if(user.isModified('password')){
       user.password=await bcrypt.hash(user.password,8)

   }
    next()
})

//creating a company model
const company = mongoose.model('company',companySchema)

module.exports=company