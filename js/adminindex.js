
document.getElementById("welcome").innerHTML = "welcomes "+localStorage.getItem("name")+" you are a admin"

const $totaljobs=document.querySelector(".totaljobs")
const $totalapplied=document.querySelector(".totalapplied")
const $totalcompanies=document.querySelector('.totalcompanies')
const $logoutbtn=document.querySelector('.logout-btn')

$totaljobs.addEventListener('click',(e)=>{
    location.href="/admin/viewjobs.html"
})

$totalapplied.addEventListener('click',(e)=>{
    location.href="/admin/viewapplications.html"
})

$totalcompanies.addEventListener('click',(e)=>{
    location.href="/admin/viewcompanies.html"
})



$logoutbtn.addEventListener('click',async(e)=>{
    const result = await fetch('/company/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    })
    console.log(result)
    if (!result.error) {
        localStorage.setItem('token', '')
        localStorage.setItem('name','')
        location.href="/"
        alert("success")
    } else {
        alert(result.error)
    }
})
