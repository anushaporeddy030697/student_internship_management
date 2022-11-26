const jwt=require("jsonwebtoken")
const student=require("../models/students")

const  auth = async(req,res,next) =>{
    try{
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token,"thisisseceret")
        //console.log(decoded);
        const user = await student.findOne({_id:decoded._id,"tokens.token":token})
       // console.log(user);
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    }
    catch(e){
        res.status(401).send({error:"please authenticate!"})
    }
}

module.exports=auth