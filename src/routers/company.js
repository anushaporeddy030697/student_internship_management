const company=require("../models/companies")
const express=require("express")
const auth=require("../middleWare/companyauth")
const job = require("../models/jobs")
const applications = require("../models/applications")
const qualified = require("../models/qualified")
const selected = require("../models/selected")
const rejected = require("../models/rejected")
const jwt=require("jsonwebtoken")
const {sendPasswordEmail,sendWelcomeEmail}=require("../emails/account")

const router = new express.Router()
const Jwt_Secret="thisisseceret"

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
     console.log("token",token)
     sendWelcomeEmail(user.email)
    //  res.cookie("Authorization",token)
    //  res.cookie("type","company")     
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
    if(!user.block){
    const token = await user.genAuthToken()
    res.cookie("Authorization",token)
    res.cookie("type","company")     
    res.send({user,token})
    }
    else res.status(400).send({error:"User blocked! Don't worry! Contact Admin!"})
}

    catch(e){
        res.status(400).send({error:e.message})
    }

 })
 
 router.get("/company/totaljobs",auth,async(req,res)=>{
    try{
    const companyid = req.query.companyid
    const jobsCount  = await job.find({postedby:companyid}).count()
     res.status(200).send({jobsCount})
    }catch(e){
     res.status(400).send({error:e})
    }
 })
 router.get("/company/shortlistjobscount",auth,async(req,res)=>{
    var applicationsCount = 0 
     try{
        let i = 0
        const companyid = req.query.companyid
        const jobs = await job.find({postedby:companyid}).select("_id")
        let newJobs = []
        for(i=0;i<jobs.length;i++){
            newJobs[i] = jobs[i]._id.toString()
        }
         const application = await qualified.find()  
         var filteredApplications = application.filter((appli)=>newJobs.includes(appli.jobid.toString()))
        applicationsCount = filteredApplications.length
         res.status(200).send({applicationsCount})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/applications",auth,async(req,res)=>{
    var applicationsCount = 0 
     try{
        let i = 0
        const companyid = req.query.companyid
        const jobs = await job.find({postedby:companyid}).select("_id")
        let newJobs = []
        for(i=0;i<jobs.length;i++){
            newJobs[i] = jobs[i]._id.toString()
        }
         const application = await applications.find()  
         var filteredApplications = application.filter((appli)=>newJobs.includes(appli.jobid.toString()))
        applicationsCount = filteredApplications.length
         res.status(200).send({applicationsCount})
     }catch(e){
         res.status(400).send({error:e})
     }
 })
  router.delete("/reject",auth,async(req,res)=>{
    try{
            const applicationId = req.query.applicationid
            const fetchedApplication = await applications.findById(applicationId)
            const deletedApplication =await applications.deleteOne({_id:applicationId})
            const newRejected = new rejected({jobid:fetchedApplication.jobid,studentid:fetchedApplication.studentid,firstname:fetchedApplication.firstname,lastname:fetchedApplication.lastname,email:fetchedApplication.email,age:fetchedApplication.age,gender:fetchedApplication.gender,universityid:fetchedApplication.universityid,phone:fetchedApplication.phone,resume:fetchedApplication.resume})
            await newRejected.save()
            res.status(200).send({response:"success"})
    }
    catch(e){
        res.status(400).send({error:"error"+e})
    }
  }) 
  router.delete("/shortlistreject",auth,async(req,res)=>{
    try{
            const applicationId = req.query.applicationid
            const fetchedApplication = await qualified.findById(applicationId)
            const deletedApplication =await qualified.deleteOne({_id:applicationId})
            const newRejected = new rejected({jobid:fetchedApplication.jobid,studentid:fetchedApplication.studentid,firstname:fetchedApplication.firstname,lastname:fetchedApplication.lastname,email:fetchedApplication.email,age:fetchedApplication.age,gender:fetchedApplication.gender,universityid:fetchedApplication.universityid,phone:fetchedApplication.phone,resume:fetchedApplication.resume})
            await newRejected.save()
            res.status(200).send({response:"success"})
    }
    catch(e){
        res.status(400).send({error:"error"+e})
    }
  }) 
  router.delete("/shortlistqualified",auth,async(req,res)=>{
    try{
            const applicationId = req.query.applicationid
            const fetchedApplication = await qualified.findById(applicationId)
            const deletedApplication =await qualified.deleteOne({_id:applicationId})
            const newSelected = new selected({jobid:fetchedApplication.jobid,studentid:fetchedApplication.studentid,firstname:fetchedApplication.firstname,lastname:fetchedApplication.lastname,email:fetchedApplication.email,age:fetchedApplication.age,gender:fetchedApplication.gender,universityid:fetchedApplication.universityid,phone:fetchedApplication.phone,resume:fetchedApplication.resume})
            await newSelected.save()
            res.status(200).send({response:"Selected for further rounds successfully!"})
    }
    catch(e){
        res.status(400).send({error:"error"+e})
    }
  }) 
  router.patch("/qualified",auth,async(req,res)=>{
    try{
        const applicationId = req.query.applicationid
        const fetchedApplication = await applications.findById(applicationId)
        const deletedAcknowledgement = await applications.deleteOne({_id:applicationId})
        const newQualified = new qualified({jobid:fetchedApplication.jobid,studentid:fetchedApplication.studentid,firstname:fetchedApplication.firstname,lastname:fetchedApplication.lastname,email:fetchedApplication.email,age:fetchedApplication.age,gender:fetchedApplication.gender,universityid:fetchedApplication.universityid,phone:fetchedApplication.phone,resume:fetchedApplication.resume})
        await newQualified.save()
        res.status(200).send({response:"success"})

    }
    catch(e){
        console.log(e)
    }
  })
 router.get("/viewapplications",auth,async(req,res)=>{
    try{
         let i = 0
        const companyid = req.query.companyid
        const jobs = await job.find({postedby:companyid}).select("_id")
        let newJobs = []
        for(i=0;i<jobs.length;i++){
            newJobs[i] = jobs[i]._id.toString()
        }
         const application = await applications.find()  
         var filteredApplications = application.filter((appli)=>newJobs.includes(appli.jobid.toString()))
        
        
    
       res.send(filteredApplications)
    } 
         
     catch(e){
         res.status(400).send({error:e})
     }
 })
 router.get("/viewshortlists",auth,async(req,res)=>{
    try{
         let i = 0
        const companyid = req.query.companyid
        const jobs = await job.find({postedby:companyid}).select("_id")
        let newJobs = []
        for(i=0;i<jobs.length;i++){
            newJobs[i] = jobs[i]._id.toString()
        }
         const application = await qualified.find()  
         var filteredApplications = application.filter((appli)=>newJobs.includes(appli.jobid.toString()))
        
        
    
       res.send(filteredApplications)
    } 
         
     catch(e){
         res.status(400).send({error:e})
     }
 })
router.get("/companypostedjobs",auth,async (req,res)=>{
    try{
        const companyid = req.query.companyid
       const jobs = await job.find({postedby:companyid})
       res.status(200).send(jobs)
    }
    catch(e){
        res.status(400).send({error:e})
    }
})

 //endpoint for logout user
 router.post("/company/logout",auth, async(req,res) =>{
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


//endpoint for company password reset
router.post("/company/password-reset", async(req,res)=>{
    const email=req.body.email
    console.log("Email ",email)
    try{
        const user = await company.findByEmail(email)
        console.log(user,"user in route")
        const secret=Jwt_Secret + user.password
        console.log(secret)
        const payload={
            email:user.email,
            id:user.id
        }
        console.log(payload," payload ")
        const token=jwt.sign(payload,secret,{expiresIn:'15m'})
        // console.log(token," token")
        const link=`http://localhost:4000/resetpassword.html?id=${user.id}&token=${token}&type=company`
        // console.log(link)
        sendPasswordEmail(email,link)
        console.log("email sent")
        // console.log("secret",secret)
        // console.log("token before mail",token)
        res.send({success:"link sent"})
    }
    catch(e){
        res.send({error:"unable to reset password"})
    }
})


router.post("/company/reset-password", async(req,res)=>{
    const { id, token } =req.body
    const {password}=req.body
    console.log(id,"id")
    try {
        console.log("user got it")
        const user = await company.findUserById(id)
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