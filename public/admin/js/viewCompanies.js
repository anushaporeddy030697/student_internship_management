const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })

window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/viewcompanies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
           
        })
    }).then((res) => res.json())
    
    const mappedUsers = result.map((company, index) => {
      let blockValue
      if(company.block){
        blockValue = "Unblock"
      }else blockValue = "Block"
        return `<div class="job">
        <h1>Company Details</h1>
        <p>Company Name: ${company.firstname} ${company.lastname} </p>
        <p>Email: ${company.email}</p>
        <p>company id: ${company.companyid} </p>
        <p>phone: ${company.phone}</p>
        <button class="btn" id="blockbutton"> <a href="block.html?companyid=${company._id}&value=${!company.block}"> ${blockValue}</a></button><br/>       
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
 

  






