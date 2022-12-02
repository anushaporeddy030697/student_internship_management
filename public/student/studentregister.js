
const $studentRegForm=document.getElementById("student-register")

function verifyPassword(password1,password2) {  
    if(password1!==password2){
        document.getElementById("message").innerHTML = "password and confirm password should be same";
        return false
    }
    if(password1.length < 8){
        document.getElementById("message").innerHTML = "password length should be longer than or equal to 8 characters";
        return false
    }
    return true
   
  }  


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

