// if((!localStorage.getItem("token")) && (localStorage.getItem('usertype')!=='company')){
//     location.href="/company/companyLogin.html"
// }

const coockievalue=document.cookie
if(!coockievalue){
    location.href="/company/companyLogin.html"
}

// const coockieArray=coockievalue.split(";")
// // console.log(coockieArray)
// const auth=coockieArray[0].split("=")
// const type=coockieArray[1].split("=")

// window.onload=()=>{
//     if(!auth || type !=company){
//         location.href="/"
//     }
// }