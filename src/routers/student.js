const student=require("../models/students")
const express=require("express")
const auth=require("../middleWare/auth")
const jwt=require("jsonwebtoken")
const {sendPasswordEmail,sendWelcomeEmail}=require("../emails/account")

const router = new express.Router()
const Jwt_Secret="thisisseceret"

router.get("/test",(req,res)=>{
    res.send({
        name:"server is working"
    })
})
 
//endpoint for creating user
router.post("/student",async(req,res)=>{
    const user = new student(req.body)
    //console.log(user)
    try{
     await user.save()
     const token = await user.genAuthToken()
     sendWelcomeEmail(user.email)
     console.log("email sent")
    //  res.cookie("Authorization",token)     
    //  res.cookie("type","student")     
     res.status(201).send({user,token})
    }catch(e){
        console.log(e)
     res.status(400).send({error:"unable to register"})
    }
  
 
 })

 //endpoint for login users
 router.post("/student/login",async(req,res)=>{
    try{
    const user = await student.findByCredentials(req.body.email, req.body.password)
    if(!user.block){
    const token = await user.genAuthToken()
    res.cookie("Authorization",token)
    res.cookie("type","student")     
    res.send({user,token})
    }
    else res.status(400).send({error:"User blocked! Don't worry! Contact Admin!"})
    }
    catch(e){
        console.log(e.message)
        res.status(400).send({error:e.message})
    }

 })

 //endpoint for logout user
 router.post("/student/logout",auth, async(req,res) =>{
     try{
         
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.clearCookie('Authorization')
        res.clearCookie('type')
        res.send()
     }
     catch(e){
         res.status(500).send({error:"unable to logout"})
     }
 })

 //endpoint for logout all devices
 router.post("/student/logoutall", auth, async(req,res)=>{
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
 router.get("/student/me", auth, async(req,res)=>{
    try{
        res.send(req.user)
    }
    catch(e){
        res.status(401).send()
    }
 })
 

 //endpoint for updating user fields
router.patch("/student/update/me", auth, async(req,res)=>{
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
router.delete("/student/delete/me", auth, async(req,res)=>{
    const _id=req.user._id

    try{
     await req.user.remove()
     res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//endpoint for student password reset
router.post("/student/password-reset", async(req,res)=>{
    const email=req.body.email
    console.log("Email ",email)
    try{
        const user = await student.findByEmail(email)
        console.log(user,"user in route")
        const secret=Jwt_Secret + user.password
        const payload={
            email:user.email,
            id:user.id
        }
        const token=jwt.sign(payload,secret,{expiresIn:'15m'})
        const link=`http://localhost:4000/resetpassword.html?id=${user.id}&token=${token}&type=student`
        sendPasswordEmail(email,link)
        console.log("secret",secret)
        console.log("token before mail",token)
        res.send({success:"link sent"})
    }
    catch(e){
        res.send({error:"unable to reset password"})
    }
})


router.post("/student/reset-password", async(req,res)=>{
    const { id, token } =req.body
    const {password}=req.body
    console.log(id,"id")
    try {
        console.log("user got it")
        const user = await student.findUserById(id)
        console.log(user)
        const secret=Jwt_Secret + user.password
        console.log("seceret after mail",secret)
        console.log("token after mail",token)
        const payload=jwt.verify(token,secret)
        console.log("payload ",payload)
        // console.log("user ",user)
        user.password=password
        await user.save()
        console.log("success")
        res.send({success:"true"})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router