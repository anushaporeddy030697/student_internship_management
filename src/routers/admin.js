const admin=require("../models/admins")
const express=require("express")
const auth=require("../middleWare/adminauth")
const student = require("../models/students")
const job = require("../models/jobs")
const company = require("../models/companies")
const jwt=require("jsonwebtoken")
const {sendPasswordEmail,sendWelcomeEmail}=require("../emails/account")

const router = new express.Router()
const Jwt_Secret="thisisseceret"

router.get("/admin/test",(req,res)=>{
    res.send({
        name:"adminserver is working"
    })
})

//endpoint for creating user
router.post("/admin",async(req,res)=>{
    const user = new admin(req.body)
    console.log("data got to backend ",user)
    try{
     await user.save()
     const token = await user.genAuthToken()
     sendWelcomeEmail(user.email)
    //  res.cookie("Authorization",token)
    //  res.cookie("type","admin")     
     res.status(201).send({user,token})
    }catch(e){
     res.status(400).send({error:"unable to register"})
    }
  
 
 })
 router.post("/adminjobs",auth,async(req,res)=>{
    job.find().then((jobs)=>{
        //console.log(jobs)
        res.status(200).json(jobs)

    }).catch((err)=>{
        // console.log(err)
        res.status(400).send({error:"unable to get jobs"})
    })
 }) 
 router.post("/viewcompanies",auth,(req,res)=>{
    company.find().then((companies)=>{
        res.status(200).json(companies)
    }).catch((err)=>{
        res.status(400).send({error:"unable to get companies"})
    })
 })
 router.patch("/block",auth,async(req,res)=>{
    try{
       const companyid = req.query.companyid
    //    console.log("-------")
    //    console.log(req.body)
    //    console.log("-------")

       const companyDetails = await company.findByIdAndUpdate(companyid,req.body)
        res.status(200).send(companyDetails)
    }catch(e){
        res.status(400).send({error:e})
    }
})
 router.patch("/studentblock",auth,async(req,res)=>{
    try{
       const studentid = req.query.studentid
    //    console.log("-------")
    //    console.log(req.body)
    //    console.log("-------")

       const studentDetails = await student.findByIdAndUpdate(studentid,req.body)
        res.status(200).send(studentDetails)
    }catch(e){
        res.status(400).send({error:e})
    }
})
 router.post("/viewstudents",auth,(req,res)=>{
    student.find().then((students)=>{
        res.status(200).json(students)
    }).catch((err)=>{
        res.status(400).send({error:"unable to get students"})
    })
 })
 router.get("/totalstudentscount",auth,async(req,res)=>{
    try{
    
    const studentsCount  = await student.find().count()
     res.status(200).send({studentsCount})
    }catch(e){
     res.status(400).send({error:e})
    }
 })
 router.get("/totaljobscount",auth,async(req,res)=>{
    try{
    
    const jobsCount  = await job.find().count()
     res.status(200).send({jobsCount})
    }catch(e){
     res.status(400).send({error:e})
    }
 })
 router.get("/totalcompaniescount",auth,async(req,res)=>{
    try{
    
    const companiesCount  = await company.find().count()
     res.status(200).send({companiesCount})
    }catch(e){
     res.status(400).send({error:e})
    }
 })

 //endpoint for login users
 router.post("/admin/login",async(req,res)=>{
    console.log("login data received ")
    try{
    console.log(req.body.email,req.body.password)
    const user = await admin.findByCredentials(req.body.email, req.body.password)    
    const token = await user.genAuthToken()   
    res.cookie("Authorization",token)
    res.cookie("type","admin")     
    res.send({user,token})
    }
    catch(e){
        res.status(400).send({error:e.message})
    }

 })

 //endpoint for logout user
 router.post("/admin/logout",auth, async(req,res) =>{
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
 router.post("/admin/logoutall", auth, async(req,res)=>{
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
 router.get("/admin/me", auth, async(req,res)=>{
    try{
        res.send(req.user)
    }
    catch(e){
        res.status(401).send()
    }
 })
 

 //endpoint for updating user fields
router.patch("/admin/update/me", auth, async(req,res)=>{
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
router.delete("/admin/delete/me", auth, async(req,res)=>{
    const _id=req.user._id

    try{
     await req.user.remove()
     res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


//endpoint for student password reset
router.post("/admin/password-reset", async(req,res)=>{
    const email=req.body.email
    console.log("Email ",email)
    try{
        const user = await admin.findByEmail(email)
        console.log(user,"user in route")
        const secret=Jwt_Secret + user.password
        const payload={
            email:user.email,
            id:user.id
        }
        const token=jwt.sign(payload,secret,{expiresIn:'15m'})
        const link=`http://localhost:4000/resetpassword.html?id=${user.id}&token=${token}&type=admin`
        sendPasswordEmail(email,link)
        console.log("secret",secret)
        console.log("token before mail",token)
        res.send({success:"link sent"})
    }
    catch(e){
        res.send({error:"unable to reset password"})
    }
})


router.post("/admin/reset-password", async(req,res)=>{
    const { id, token } =req.body
    const {password}=req.body
    console.log(id,"id")
    try {
        console.log("user got it")
        const user = await admin.findUserById(id)
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