const checklogin = ()=>{
    const coockievalue=document.cookie
    console.log(coockievalue,"coockies")
    if(coockievalue){
        console.log("test")
        const coockieArray=coockievalue.split(";")
        const auth=coockieArray[0].split("=")
        const type=coockieArray[1].split("=")
        console.log("auth ",auth[1])
        console.log("type ",type[1])
        if(auth[1] && type[1] ==="student"){
            location.href="/student/studentindex.html"
        }
        if(auth[1] && type[1] ==="company"){
            location.href="/company/companyindex.html"
        }
        if(auth[1] && type[1] ==="admin"){
            location.href="/admin/adminindex.html"
        }
    
    }
   
    
}
checklogin()

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
    console.log(result,result)
    if (!result.error) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('name',result.user.firstname)
        localStorage.setItem('studentid',result.user._id)
        location.href="/student/studentindex.html"
        alert("success")
    } else {
        alert(result.error)
    }
})