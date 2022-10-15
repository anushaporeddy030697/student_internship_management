const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const userSchema = mongoose.Schema({
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
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
    universityid:{
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
userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
} 

//userdef function for gen auth token
userSchema.methods.genAuthToken = async function(){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},"thisisseceret",{ expiresIn:"7 days"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

//userdef function for authentication
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error("unable to login")
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        throw new Error("Unable to login")
    }
    return user
}

//using mongoose middleware for hashing passwords
userSchema.pre("save",async function (next) {
    const user =this
    
   if(user.isModified('password')){
       user.password=await bcrypt.hash(user.password,8)

   }
    next()
})

//creating a user model
const User = mongoose.model('Student',userSchema)

module.exports=User