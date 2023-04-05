
document.getElementById("welcome").innerHTML = "welcomes "+localStorage.getItem("name").toUpperCase()+" you are an Admin!"
 
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


     var pie = new ej.charts.AccumulationChart({
        // Creating Title
        title: "Applicants , Companies & Jobs Statistics",
        titleStyle: {
            fontFamily: "Arial",
            fontStyle: 'italic',
            fontWeight: 'regular',
            color: "#E27F2D",
            size: '23px'
          },
          
        subTitle : '(Data is fetched live from database)',
        legendSettings: {
         visible: true,
         position: 'Right',
         height: '100',
         width: '120',
         size: '20px'
        },
        enableAnimation: true,
        //Initializing Series
        series: [
            {
                dataSource: [
                    { 'x': 'Applicants', y: result.studentsCount },
                    { 'x': 'Companies', y: result2.companiesCount },
                    { 'x': 'Jobs', y: result1.jobsCount }
                    
                ],
                emptyPointSettings: { mode: 'Gap', fill: 'red', border: { width: 2, color: 'yellow'}},
                dataLabel: {
                    visible: true,
                    position: 'Inside',
                },
                xName: 'x',
                yName: 'y',
                innerRadius: '35%',
                radius: '70%',
                border: {
                    color: 'black',
                    width: 1
                 },
            }
        ],
        //Initializing Tooltip
    tooltip: { enable: true, header: '', format: '${point.x}:<b> ${point.y}<b>' },
    margin: {bottom: 50},
    heigth: '100'
    });
    pie.appendTo('#contain');





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
       // alert("success")
       return res.json()
    })
    
})
