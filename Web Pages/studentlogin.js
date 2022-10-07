const $studentLoginForm=document.getElementById("student-login")

$studentLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("student login intiated")
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value

    const result = await fetch('/student/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:$email,
            password:$password
        })
    }).then((res) => res.json())
    console.log(result)
    if (!result.error) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('name',result.user.firstname)
        location.href="/student/studentindex.html"
        alert("success")
    } else {
        alert(result.error)
    }
})