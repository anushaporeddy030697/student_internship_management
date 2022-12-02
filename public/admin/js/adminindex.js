
document.getElementById("welcome").innerHTML = "welcomes "+localStorage.getItem("name")+" you are a admin"
 
const $totaljobs=document.querySelector(".totaljobs")
const $totalapplied=document.querySelector(".totalapplied")
const $totalcompanies=document.querySelector('.totalcompanies')
const $logoutbtn=document.querySelector('.logout-btn')
const token=localStorage.getItem('token')

$totaljobs.addEventListener('click',(e)=>{
    location.href="/admin/viewjobs.html"
})

$totalapplied.addEventListener('click',(e)=>{
    location.href="/admin/viewapplications.html"
})

$totalcompanies.addEventListener('click',(e)=>{
    location.href="/admin/viewcompanies.html"
})

window.onload=async()=>{
    console.log("onload")
    const result = await fetch('/totalstudentscount', {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        } 
    }).then((res) => res.json())
    
    //console.log(result.jobsCount)
    document.getElementById("totalstudentscount").innerHTML=result.studentsCount
    const result1 = await fetch(`/totaljobscount`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    
   // console.log(result1.jobsCount)
    document.getElementById("totaljobscount").innerHTML=result1.jobsCount
    const result2 = await fetch(`/totalcompaniescount`, {
        method: 'GET',
        headers: {
            'Authorization':'Bearer '+token
        }
    }).then((res) => res.json())
    document.getElementById("totalcompaniescount").innerHTML=result2.companiesCount

}


$logoutbtn.addEventListener('click',async(e)=>{
    const result = await fetch('/admin/logout', {
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
    
})
