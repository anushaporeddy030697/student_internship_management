const $studentRegForm=document.getElementById("student-register")
const $studentVerify=document.getElementById("verify")
const $enterOtp = document.getElementById("enterOtp")
const $checkOtp = document.getElementById("checkOtp")
var $otpstatus = false

$studentVerify.addEventListener('click',async (e) => {
    e.preventDefault()
    console.log("Mail verification initiated")
    const $mailVerify = document.getElementById("email").value;
    
    console.log($mailVerify)
    $studentVerify.style.display = "none"
    $enterOtp.style.display = "block"
    $checkOtp.style.display = "block"
    if($mailVerify){
        const result1 = await fetch('/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:$mailVerify
            })
        }).then((res) => res.json())
        console.log(result1.msg)
        if(!result1.error){
            alert("OTP sent to mail")
        }else{
            alert("OTP Failed! due to error :",result1.error)
        }
    }
})


$studentRegForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("data validated")
    const $firstname=document.getElementById("first-name").value
    const $lastname=document.getElementById("last-name").value
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value
    const $confirmPassword=document.getElementById("password2").value
    const $gender= document.getElementById("gender").value
    const $age=document.getElementById("age").value
    const $universityid=document.getElementById("universityid").value
    const $phone=document.getElementById("phone").value

    console.log($gender,$phone,"gender, value")

    if(verifyPassword($password,$confirmPassword)){
        const result = await fetch('/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname:$firstname,
                lastname:$lastname,
                email:$email,
                password:$password,
                age:$age,
                gender:$gender,
                phone:$phone,
                universityid:$universityid
            })
        }).then((res) => res.json())
        console.log(result)
        if (!result.error) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('name',result.user.firstname)
            localStorage.setItem('studentid',result.user._id)
            location.href="/student/login.html"
            alert("success")
        } else {
            alert(result.error)
        }
    }
})

