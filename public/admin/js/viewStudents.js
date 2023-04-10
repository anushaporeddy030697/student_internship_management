const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
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
    console.log(result)
    const mappedUsers = result.map((student, index) => {
      let blockValue
      if(student.block){
        blockValue = "Unblock"
      }else blockValue = "Block"
        return `<div class="job">
        <h1>Student Details</h1>
        <p>Student Name: ${student.firstname} ${student.lastname} </p>
        <p>Email: <a href="mailto:${student.email}" target="_blank">${student.email}</a></p>
        <p>DOB (MM/Year) : ${student.month} / ${student.year} </p>
        <p>SSN:  ${student.ssn} </p>
        <p>Gender: ${student.gender}</p>
        <p> University Id: ${student.universityid}</p>
        <p>phone: ${student.phone}</p>
        <button class="btns" id="blockbutton"> <a href="studentblock.html?companyid=${student._id}&value=${!student.block}"> ${blockValue}</a></button><br/>       

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
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/admin/adminindex.html"
      }

}
 

 

$searchbutton.addEventListener('click',async (e)=>{
  const studentName = document.getElementById('studentName').value
  const universityId = document.getElementById('universityId').value
  const mail = document.getElementById('email').value
  const ssn = document.getElementById('ssn').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result = await fetch('/viewstudents', {
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
 
 

 
const filterTitleFunction = (student)=>{
  // console.log(document.getElementById("filtertype").value)
 // const filtertype = document.getElementById("filtertype").value
 // console.log(job)
// return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
if(searchterm) {
 return  parseInt(student.ssn) == parseInt(searchterm) || parseInt(student.universityid) == parseInt(searchterm) || student.firstname.toLowerCase().includes(searchterm) || student.lastname.toLowerCase().includes(searchterm) || student.email.toLowerCase().includes(searchterm)// || job.empbenefits.toString().includes(searchterm)
}

let b = {
    c1 : student.email,
    c2 : student.firstname,
    c3 : student.lastname
}

console.log(b)
let flag , a
let arr = []
let a1 = studentName , a2 = mail , a3 = universityId , a4 = ssn
if(a1)
 arr.push(a1.toLowerCase())
if(a2)
 arr.push(a2.toLowerCase())
if(a3)
  arr.push(a3)
if(a4)
  arr.push(a4)

 let c = Object.values(b)
a = arr.length 
for(let i=0; i< a ; i++){

  if(c.toString().toLowerCase().includes(arr[i])){
      flag = true
   }
   else if(Number(student.universityid) == Number(arr[i])){
    flag = true
   console.log(a3)
  }
else if(Number(student.ssn) == Number(arr[i])){
     flag = true
  }
else{
 flag = false
 break
    }
  }


if(flag == true){
 console.log(b.c2)
 return b.c2
  }


}
 
 const filteredResult = result.filter(filterTitleFunction)

 
 const mappedUsers = filteredResult.map((student, index) => {
  let blockValue
  if(student.block){
    blockValue = "Unblock"
  }else blockValue = "Block"
    return `<div class="job">
    <h1>Student Details</h1>
    <p>Student Name: ${student.firstname} ${student.lastname} </p>
    <p>Email: <a href="mailto:${student.email}" target="_blank">${student.email}</a></p>
    <p>DOB (MM/Year) : ${student.month} / ${student.year} </p>
    <p>SSN:  ${student.ssn} </p>
    <p>Gender: ${student.gender}</p>
    <p> University Id: ${student.universityid}</p>
    <p>phone: ${student.phone}</p>
    <button class="btns" id="blockbutton"> <a href="studentblock.html?companyid=${student._id}&value=${!student.block}"> ${blockValue}</a></button><br/>       

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
    alert("Matching application not found") 
    //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
   // location.href="/admin/viewapplications.html"
  }  
})






// var list = document.createElement('ul');

// Create a list item for each wizard
// and append it to the list
// result.forEach(function (res) {
// 	// var li = document.createElement('li');
// 	// li.textContent = wizard;
// 	// list.appendChild(li);
//     console.log(res)
// });
 