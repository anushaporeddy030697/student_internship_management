const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })

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
        <button class="btn"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="About company.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}"> Download About Company</a></button><br />
          <button class="apply-btn btn"  onclick="window.location.href='applypage.html?jobid=${job._id}'" type="submit" value="Submit" > Apply </button>    
      </div>`;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/student/studentindex.html"
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
 