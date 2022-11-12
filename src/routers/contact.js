const contact=require("../models/contacts")
const express=require("express")

const router = new express.Router()


router.post("/contact",async (req,res)=>{
    const user = new contact(req.body)
    try{
     await user.save() 
     res.status(201).send({success:"success"})
    }catch(e){
     res.status(400).send({error:"error"})
    }
})

module.exports = router