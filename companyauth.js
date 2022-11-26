const jwt=require("jsonwebtoken")
const company=require("../models/companies")

const  companyauth = async(req,res,next) =>{
    try{
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token,"thisisseceret")
        // console.log(decoded);
        const user = await company.findOne({_id:decoded._id,"tokens.token":token})
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

module.exports=companyauth