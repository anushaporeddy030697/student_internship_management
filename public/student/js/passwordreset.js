const $studentPasswordForm=document.getElementById("student-password-reset")

$studentPasswordForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("student password reset clicked")
    const $email=document.getElementById("email").value

    const result = await fetch('/student/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:$email,
            
        })
    }).then((res) => res.json())
    console.log(result,"result")
    if (result.success) {
        alert("success")
    } else {
        alert(result.error)
    }
})