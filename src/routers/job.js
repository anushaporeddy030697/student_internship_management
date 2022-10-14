const job=require("../models/jobs")
const express=require("express")
const auth=require("../middleWare/companyauth")
const studentAuth = require("../middleware/auth")

const router = new express.Router()

router.get("/jobtest",(req,res)=>{
    res.status(200).send({
        name:"server is working"
    })
})

//endpoint for creating user
router.post("/company/addjob",auth,async(req,res)=>{
    const newJob = new job(req.body)
    console.log(newJob)
    try{
     await newJob.save()
     
     res.status(200).send({newJob})
    }catch(e){
     res.status(400).send({error:"unable to add job."})
    }
  
 
 })

 router.post("/jobs",studentAuth,async(req,res)=>{
    job.find().then((jobs)=>{
        //console.log(jobs)
        res.status(200).json(jobs)

    }).catch((err)=>{
        // console.log(err)
        res.status(400).send({error:"unable to get jobs"})
    })
 })

 router.get("/myjobs",auth,async(req,res)=>{
    console.log(req.body.id)
    job.find({postedby:req.body.companyid}).then((jobs)=>{
        //console.log(jobs)
        res.json(jobs)
    }).catch((err)=>{
        console.log(err)
    })
 })

router.delete("/delete",auth,async(req,res)=>{
    job.deleteOne({_id:req.body._id}).then((jobs)=>{
        res.json(jobs)
    }).catch((err)=>{
        console.log(err)
    })
})

 module.exports = router