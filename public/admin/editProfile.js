const token=localStorage.getItem('token')
const $studentRegForm=document.getElementById("student-register")

//const base64 = require('base64topdf');
const $firstname=document.getElementById("first-name")
const $lastname=document.getElementById("last-name")
const $email=document.getElementById("email")
const $gender= document.getElementById("gender")
const $age=document.getElementById("age")
const $phone=document.getElementById("phone")


window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/adminprofile?adminid=${localStorage.getItem('adminid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    
     $firstname.value = result.firstname
     $lastname.value = result.lastname
     $email.value = result.email
     $gender.value = result.gender
     $age.value = result.age
     $phone.value = result.phone
    
}
 

  


$studentRegForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const $firstname=document.getElementById("first-name").value
    const $lastname=document.getElementById("last-name").value
    const $email=document.getElementById("email").value
    const $gender= document.getElementById("gender").value
    const $age=document.getElementById("age").value
    const $phone=document.getElementById("phone").value

    console.log($gender,$phone,"gender, value")

    
        const result = await fetch(`/editadminprofile?adminid=${localStorage.getItem('adminid')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token

            },
            body: JSON.stringify({
                firstname:$firstname,
                lastname:$lastname,
                email:$email,
                age:$age,
                gender:$gender,
                phone:$phone,
            })
        }).then((res) => res.json())
        console.log(result)
        if (!result.error) {

            location.href="/admin/adminindex.html"
            alert("success")
        } else {
            alert(result.error)
        }
    }
)





