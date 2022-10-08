const $companyLoginForm=document.getElementById("company-login")

$companyLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("company login intiated")
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value

    const result = await fetch('/company/login', {
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
        location.href="/company/companyindex.html"
        alert("success")
    } else {
        alert(result.error)
    }
})