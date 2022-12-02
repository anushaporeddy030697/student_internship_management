const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");

// $applybtn.addEventListener('click',(e)=>{
//     location.href='/student/applypage.html'
// })

window.onload=async()=>{
    console.log("onload") 
    const result = await fetch('/viewstudents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({ 
           
        })
    }).then((res) => res.json())
    
    const mappedUsers = result.map((student, index) => {
      let blockValue
      if(student.block){
        blockValue = "Unblock"
      }else blockValue = "Block"
        return `<div class="job">
        <h1>Student Details</h1>
        <p>Student Name: ${student.firstname} ${student.lastname} </p>
        <p>Email: ${student.email}</p>
        <p>Age:  ${student.age} years </p>
        <p>Gender: ${student.gender}</p>
        <p> University Id: ${student.universityid}</p>
        <p>phone: ${student.phone}</p>
        <button class="btn" id="blockbutton"> <a href="studentblock.html?companyid=${student._id}&value=${!student.block}"> ${blockValue}</a></button><br/>       

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
 