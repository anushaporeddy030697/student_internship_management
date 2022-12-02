const nodemailer = require("nodemailer");

const sendWelcomeEmail =(email)=>{
    const welcomeMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"Welcome To Internship Recuritment Portal",
        html:"<div><h1>welcome to intership portal</h1><br/><p>Thanks for creating the account in our portal we hope that you will like our services.Fell free to email us if you need any help</p></br><h3>Thank you!</h3></div>"
      }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(welcomeMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}

const sendPasswordEmail=(email,link)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"password reset mail",
        html:`<div><h4>Hi, Here is the link for reset password for your account in student internship portal\n kindly reset the password\n Note:The link is only vaild for fifteen minutes after that the link expries</h4><a href=${link}>Password reset link</a>`
    }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}


module.exports={
    sendPasswordEmail,
    sendWelcomeEmail
}