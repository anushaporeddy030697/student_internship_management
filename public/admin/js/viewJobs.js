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
  const result = await fetch('/adminjobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())








  //console.log(result);
  
 
   // console.log(document.getElementById("filtertype").value)
  // const filtertype = document.getElementById("filtertype").value
  // console.log(job)
 // return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
 
 

 
 const filterTitleFunction = (job)=>{
  // console.log(document.getElementById("filtertype").value)
 // const filtertype = document.getElementById("filtertype").value
 // console.log(job)
// return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
if(searchterm) {
 return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm)// || job.empbenefits.toString().includes(searchterm)
}

let b = {
    c1 : job.companyname,
    c2 : job.title,
    c3 : job.worktype
}

console.log(b)
let flag , a
let arr = []
let a1 = companyName , a2 = jobTitle , a3 = Exp , a4 = jobType , a5 = salary
if(a1)
 arr.push(a1.toLowerCase())
if(a2)
 arr.push(a2.toLowerCase())
if(a3)
 arr.push(a3)
if(a4)
 arr.push(a4.toLowerCase())
if(a5)
 arr.push(a5)


a = arr.length     
for(let i=0; i< a ; i++){
let c = Object.values(b)
console.log(c , arr , arr[2] , "c , arr")
if(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase())){
 flag = true
 console.log(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase()))
}
else if(Number(job.yoe) == Number(arr[i])){
  flag = true
  console.log(job.yoe, arr[i] , "yoe")
}
else if(Number(job.empbenefits) == Number(arr[i])){
  flag = true
  console.log(job.empbenefits , arr[i], "empben")
}
else{
 flag = false
 break
    }
  }
if(flag == true){
 console.log(b.c1)
 return b.c1
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
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />   
  </div>`;
  });

 //console.log("mpusers",mappedUsers)
  if(mappedUsers.length>0){
    usersContainer.innerHTML = mappedUsers;
    if(mappedUsers.length < 3){
      const  ab = document.getElementById("footer")
       ab.classList.add("foot")
     }
}
  else{
    alert("no matching results")
  }   
})




window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/adminjobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
          
        })
    }).then((res) => res.json())
    console.log(result)

    const mappedUsers = result.map((job, index) => {
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
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />
      </div>`;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers
        if(mappedUsers.length < 3){
          const  ab = document.getElementById("footer")
           ab.classList.add("foot")
         }
    }
      else{
        alert("Matching job not found") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/admin/adminindex.html"
      }

}
 

  






// var list = document.createElement('ul');

// Create a list item for each wizard
// and append it to the list
// result.forEach(function (res) {
// 	// var li = document.createElement('li');
// 	// li.textContent = wizard;
// 	// list.appendChild(li);
//     console.log(res)
// });
 