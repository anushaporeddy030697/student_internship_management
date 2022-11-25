const $passwordResetForm=document.getElementById("password-reset")

const url=location.href
const userkeys=url.split("?")[1]
const $id=userkeys.split("&")[0].split("=")[1]
const $token=userkeys.split("&")[1].split("=")[1]
const type=userkeys.split("&")[2].split("=")[1]

console.log($id," ",$token)
console.log("type",type,type.length)

$passwordResetForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("password reset intiated")
    const $password=document.getElementById("password").value
    const $password2=document.getElementById("password2").value
    if($password!==$password2){
        console.log("password and conform password doesnot match ",$password," ",$password2)
        return
    }
    console.log("intiated")
    const result = await fetch(`/${type}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:$id,
            token:$token,
            password:$password
        })
    }).then((res)=>{
        
        console.log("finished")
       if(res.status==200){
        alert("password changed successfully")
        location.href="/"
       }
       else{
        alert("failed to change password")
       }
        
    })
   
    
})

