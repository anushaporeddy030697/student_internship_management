const company=require("../models/companies")
const express=require("express")
const auth=require("../middleWare/companyauth")
const job = require("../models/jobs")
const applications = require("../models/applications")
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
        res.status(400).send({error:"unable to login"})
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
        res.send()
     }
     catch(e){
         res.status(500).send({error:"unable to logout"})
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