const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		firstName:{
			type:String,
			required:true
		},
		lastName:{
			type:String,
			required:true
		},
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		email:{
			type:String,
			required:true,
			trim:true,
			lowercase:true,
			// validate(value){
			// 	if(!validator.isEmail(value)){
			// 		throw new Error("Email is invalid!")
			// 	}
			// }
		},		
		password: { 
			type: String, 
			required: true,
			trim:true,
			validate(value){
				if(value.length<6){
					throw new Error("password length is lessthan 6")
				}
				else if(value.includes("password")){
					throw new Error("password contains password")
				}
			}
		 }	,
		phone:{
			type:Number,
			required:true
		}		
	},
	
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
