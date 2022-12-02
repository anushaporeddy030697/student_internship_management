const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("profiles");
//const base64 = require('base64topdf');



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/studentprofile?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    
     
    const mappedUsers = `<div class="profile">
        <p>First name: ${result.firstname} </p>
        <p>Last Name: ${result.lastname}</p>
        <p>Email: ${result.email} </p>
        <p>age: ${result.age} years</p>
        <p>gender: ${result.gender} </p>
        <p>university Id: ${result.universityid}</p>
        <p>mobile: ${result.phone} </p>
        
        <button class="btn"> <a href="editprofile.html"> Edit Profile</a></button><br/>       
      </div>`
    
    console.log(mappedUsers)
     
      usersContainer.innerHTML = mappedUsers
}
 

  






