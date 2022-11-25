const nodemailer = require("nodemailer");
const msg={
  from:"studentinternship1234@gmail.com",
  to:"studentinternship1234@gmail.com",
  subject:"",
  text:""
}

nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"studentinternship1234@gmail.com",
    pass:"cbotfjartbjbebta"
  },
  port:465,
  host:"smtp.gmail.com"
}).sendMail(msg,(err)=>{
  if(err){
    return console.log("error occurs",err)
  }else{
    return console.log("emai sent")
  }
})