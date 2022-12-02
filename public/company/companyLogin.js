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
        if(auth[1] && type[1] ==="company"){
            location.href="/company/companyindex.html"
        }
    
        
    }
   
    
}
checklogin()

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
        localStorage.setItem('companyid',result.user._id)
        localStorage.setItem('usertype','company')
        location.href="/company/companyindex.html"
        alert("success")
    } else {
        alert(result.error)
    }
})