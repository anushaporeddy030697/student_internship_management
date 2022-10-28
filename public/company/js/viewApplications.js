const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");


 
window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/viewapplications?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers = result.map((application, index) => {
        return `<div class="job">
        <h1>Application details</h1>
        <p>Student Name: ${application.firstname} </p>
        <p>Email: ${application.email}</p> 
        <p>Age: ${application.age}</p>
        <p>Phone: ${application.phone}</p>
        <p>Gender: ${application.gender}</p>
        <button class="btn"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />

      
          
      </div>`;
      });

      usersContainer.innerHTML = mappedUsers

}
 

  
 





