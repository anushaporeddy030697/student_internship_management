const $studentLoginForm=document.getElementById("student-apply")

$studentLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("student application intiated")
    const $email=document.getElementById("email").value
    const $firstname=document.getElementById("first-name").value
    const $lastname=document.getElementById("last-name").value
    const $age=document.getElementById("age").value
    const $universityid=document.getElementById("universityid").value
    const $phone=document.getElementById("phone").value
    const $gender = document.getElementById("gender").value
    const $resume=document.querySelector('#resume')
    const $studentid=localStorage.getItem('studentid')
    const url = window.location.href
    const jobid = url.split('=')
    const formData = new FormData()
    formData.append("firstname",$firstname)
    formData.append("email",$email)
    formData.append("lastname",$lastname)
    formData.append("age",$age)
    formData.append("universityid",$universityid)
    formData.append("phone",$phone)
    formData.append("studentid",$studentid)
    formData.append("resume",$resume.files[0])
    formData.append("gender",$gender)
     
    const result = await fetch(`/apply/${jobid[1]}`, {
        method: 'POST',
        headers: {
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        body: formData
    }).then((res) => res.json())
    //console.log(result)
    if (!result.error) {
        location.href="/student/studentindex.html"
        alert("success")
    } else {
        alert("error")
    }
})