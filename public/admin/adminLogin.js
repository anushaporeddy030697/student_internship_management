const checklogin = ()=>{
    const coockievalue=document.cookie
    console.log(coockievalue,"coockies")
    if(coockievalue){
        console.log("test")
        const coockieArray=coockievalue.split(";")
        const auth=coockieArray[0].split("=")
        const type=coockieArray[1].split("=")
        console.log("auth ",auth)
        console.log("type ",type)
        if(auth[1] && type[1] ==="admin"){
            location.href="/admin/adminindex.html"
        }
    
        
    }
   
    
}
checklogin()

const $adminLoginForm=document.getElementById("admin-login")

$adminLoginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("admin login intiated")
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value

    const result = await fetch('/admin/login', {
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
        localStorage.setItem('adminid',result.user._id)
        location.href="/admin/adminindex.html"
        alert("success")
    } else {
        alert(result.error)
    }
})