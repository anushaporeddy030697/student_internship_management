const sgMail=require('@sendgrid/mail')

const sendgridAPIKey="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"

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email)=>{  
    sgMail.send({
        to:email,
        from:"studentinternship123@gmail.com",
        subject:"Welcome To Internship Recuritment Portal",
        html:"<div><h1>welcome to intership portal</h1><br/><p>Thanks for creating the account in our portal we hope that you will like our services.Fell free to email us if you need any help</p></br><h3>Thank you!</h3></div>"
    })
}


const sendPasswordEmail = (email,link)=>{  
    sgMail.send({
        to:email,
        from:"studentinternship123@gmail.com",
        subject:"password reset mail",
        text:"Hi, Here is the link for reset password for your account in student internship portal\n kindly reset the password\n Note:The link is only vaild for fifteen minutes after that the link expries",
        html:`<a href=${link}>Password reset link</a>`
    })
    console.log("Email sent")
}

module.exports={
    sendPasswordEmail,
    sendWelcomeEmail
}