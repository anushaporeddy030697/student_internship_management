const $adminPasswordForm=document.getElementById("admin-password-reset")

$adminPasswordForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("admin password reset clicked")
    const $email=document.getElementById("email").value

    const result = await fetch('/admin/password-reset', {
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