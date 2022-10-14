const company=require("../models/companies")
const express=require("express")
const auth=require("../middleWare/companyauth")

const router = new express.Router()


router.get("/company/test",(req,res)=>{
    res.send({
        name:"companyserver is working"
    })
})

//endpoint for creating user
router.post("/company",async(req,res)=>{
    const user = new company(req.body)
    try{
     await user.save()
     const token = await user.genAuthToken()
     res.cookie("Authorization",token)
     res.status(201).send({user,token})
    }catch(e){
     res.status(400).send({error:"unable to register"})
    }
  
 
 })

 //endpoint for login users
 router.post("/company/login",async(req,res)=>{
    console.log("data got to backend ")
    try{
    const user = await company.findByCredentials(req.body.email, req.body.password)
    console.log("data got user ")
    const token = await user.genAuthToken()
    res.cookie("Authorization",token)
    res.send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

 })

 //endpoint for logout user
 router.post("/company/logout",auth, async(req,res) =>{
     try{
         
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()
     }
     catch(e){
         res.status(500).send(e)
     }
 })

 //endpoint for logout all devices
 router.post("/company/logoutall", auth, async(req,res)=>{
     try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
     }
     catch(e){
        res.status(400).send()
     }
 })
 
 //endpoint for getting  user
 router.get("/company/me", auth, async(req,res)=>{
    try{
        res.send(req.user)
    }
    catch(e){
        res.status(401).send()
    }
 })
 

 //endpoint for updating user fields
router.patch("/company/update/me", auth, async(req,res)=>{
    const _id=req.user._id
    const Updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperator = Updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperator){
        return res.status(400).send({error:"invalid updates!"})
    }
    
    try{
        const user= req.user
        Updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})

//endpoint for deleting users
router.delete("/company/delete/me", auth, async(req,res)=>{
    const _id=req.user._id

    try{
     await req.user.remove()
     res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//emnpoin

module.exports = router