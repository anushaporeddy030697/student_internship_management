document.getElementById("welcome").innerHTML = "welcome "+localStorage.getItem("name")+" you logged in as a company"

const $totaljobs=document.querySelector(".totaljobs")
const $totalapplied=document.querySelector(".totalapplied")
const $logoutbtn=document.querySelector('.logout-btn')

const token=localStorage.getItem('token')

$totaljobs.addEventListener('click',(e)=>{
    location.href="/company/viewjobs.html"
})

$totalapplied.addEventListener('click',(e)=>{
    location.href="/company/viewapplications.html"
})
