
document.getElementById("welcome").innerHTML = "welcome "+localStorage.getItem("name")+" you logged in as a company"

const $totaljobs=document.querySelector(".totaljobs")
const $totalapplied=document.querySelector(".totalapplied")
const $totalshorlisted = document.querySelector(".totalshortlisted")
const $logoutbtn=document.querySelector('.logout-btn')

const token=localStorage.getItem('token')

$totaljobs.addEventListener('click',(e)=>{
    location.href="/company/viewjobs.html"
})

$totalapplied.addEventListener('click',(e)=>{
    location.href="/company/viewapplications.html"
})
$totalshorlisted.addEventListener('click',(e)=>{
    location.href="/company/viewshortlists.html"
})
window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/company/totaljobs?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    
    console.log(result.jobsCount)
    document.getElementById("totaljobs").innerHTML=result.jobsCount
    const result1 = await fetch(`/applications?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    
    console.log(result1.applicationsCount)
    document.getElementById("totalapplications").innerHTML=result1.applicationsCount
    const result2 = await fetch(`/company/shortlistjobscount?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    
    console.log(result2.applicationsCount)
    document.getElementById("totalshortlists").innerHTML=result2.applicationsCount
}
$logoutbtn.addEventListener('click',async(e)=>{
    const result = await fetch('/company/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    }).then((res)=>{
        localStorage.clear()
        location.href="/"
        alert("success")
        return res.json()
    })
    console.log(result)
   
})
