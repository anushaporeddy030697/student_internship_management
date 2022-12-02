// if(!localStorage.getItem("token")){
//     location.href="/admin/adminLogin.html"
// }

const coockievalue=document.cookie
if(!coockievalue){
    location.href="/admin/adminLogin.html"
}

 
// const coockievalue=document.cookie
// const coockieArray=coockievalue.split(";")
// // console.log(coockieArray)
// const auth=coockieArray[0].split("=")
// const type=coockieArray[1].split("=")

// window.onload=()=>{
//     if(!auth || type !=admin){
//         location.href="/"
//     }
// }