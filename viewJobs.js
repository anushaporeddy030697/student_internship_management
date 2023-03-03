const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')



let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })
$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const jobTitle = document.getElementById('jobTitle').value
  const Exp = document.getElementById('experience').value
  const jobType = document.getElementById('jobType').value
  const salary = document.getElementById('salary').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result = await fetch('/jobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())
  //console.log(result);
  
  const filterTitleFunction = (job)=>{
   // console.log(document.getElementById("filtertype").value)
  // const filtertype = document.getElementById("filtertype").value
  // console.log(job)
 // return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
 if(searchterm) {
  return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm)// || job.empbenefits.toString().includes(searchterm)
 }
  let b = job
 // console.log(b.companyname.toLowerCase().includes(companyName.toLowerCase()))
 

let flag , a
let arr = []
let a1 = companyName , a2 = jobTitle , a3 = Exp , a4 = jobType , a5 = salary
if(a1)
 arr.push(a1.toLowerCase())
if(a2)
 arr.push(a2.toLowerCase())
if(a3)
 arr.push(a3)
else
 a3 = 0
if(a4)
 arr.push(a4.toLowerCase())
if(a5)
 arr.push(a5)
else 
 a5 = 0

a = arr.length     
for(let i=0; i< a ; i++){
c = Object.values(b)
if(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase()) || c[4] == a5 || c[2] == a3){
 flag = true
}
else{
 flag = false
 break
    }
  }
if(flag == true){
 console.log(b.companyname)
 return b.companyname
  }





  }

  
  
  const filteredResult = result.filter(filterTitleFunction)

  const mappedUsers = filteredResult.map((job, index) => {
    return `<div class="job">
    <h1>Job Description</h1>
    <p>Company Name: ${job.companyname} </p>
    <p>Job Title: ${job.title}</p>
    <p>Experience level: ${job.yoe} years</p>
    <p>
      Job Responsibilities:${job.requirements}
    </p>
    <p>Work Type: ${job.worktype} </p>
    <p>Employee type: ${job.emptype} </p>
    <p>Employee benifits: ${job.empbenefits} </p>
    <button class="btn"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />
      <button class="apply-btn btn"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Apply </button>    
  </div>`;
  });

  console.log(filteredResult)
  if(mappedUsers.length>0){
    usersContainer.innerHTML = mappedUsers
}
  else{
    alert("no matching results")
  }
})

window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    }).then((res) => res.json())


/*    let a = result.length;
    var companyName = document.getElementById('companyName').value
    var jobTitle = document.getElementById('jobTitle').value
    var Exp = document.getElementById('experience').value
*/

    const mappedUsers = result.map((job, index) => {
        return `<div class="job">
        <h1>Job Description</h1>
        <p>Company Name : ${job.companyname} </p>
        <p>Job Title : ${job.title}</p>
        <p>Experience level : ${job.yoe} years</p>
        <p>
          Job Responsibilities :${job.requirements}
        </p>
        <p>Work Type : ${job.worktype} </p>
        <p>Employee type : ${job.emptype} </p>
        <p>Employee benifits : ${job.empbenefits} </p>
        <button class="btn"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company </a></button><br />
          <button class="apply-btn btn"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Apply </button>    
      </div>  `;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML += mappedUsers
    //    console.log(mappedUsers)
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
          // location.href="../student/studentindex.html"
      }
}
