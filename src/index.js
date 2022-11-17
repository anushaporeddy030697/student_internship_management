const express=require('express')
require("./db/mongoose")
const path=require('path')
const student=require("./models/students")
const studentRouter=require("./routers/student")
const company=require("./models/companies")
const companyRouter=require("./routers/company")
const admin=require("./models/admins")
const adminRouter=require("./routers/admin")
const jobsRouter = require('./routers/job')

const app=express()

const port=process.env.PORT || 4000
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(studentRouter)
app.use(companyRouter)
app.use(adminRouter)
app.use(jobsRouter)

app.listen(port,()=>{
    console.log("server is up and running on ",port)
})