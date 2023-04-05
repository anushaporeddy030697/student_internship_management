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
        <p>Email: <a href="mailto:${company.email}" target="_blank">${company.email}</a></p>
        <p>company id: ${company.companyid} </p>
        <p>phone: ${company.phone}</p>
        <button class="btns" id="blockbutton"> <a href="block.html?companyid=${company._id}&value=${!company.block}"> ${blockValue}</a></button><br/>       
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
           location.href="/student/studentindex.html"
      }

}
 


$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const companyId = document.getElementById('companyId').value
  
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch('/viewcompanies', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    },
    body: JSON.stringify({
 
})
  }).then((res) => res.json())

console.log(result1)

const filterTitleFunction = (company)=>{
  // console.log(document.getElementById("filtertype").value)
 // const filtertype = document.getElementById("filtertype").value
 // console.log(job)
// return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
if(searchterm) {
 return  parseInt(company.companyid) == parseInt(searchterm) || company.firstname.toLowerCase().includes(searchterm) || company.lastname.toLowerCase().includes(searchterm) // || job.empbenefits.toString().includes(searchterm)
}

let b = {
    c1 : company.firstname,
    c2 : company.lastname
}

console.log(b)
let flag , a
let arr = []
let a1 = companyName , a2 = companyId
if(a1)
 arr.push(a1.toLowerCase())
if(a2)
 arr.push(a2.toLowerCase())



a = arr.length     
for(let i=0; i< a ; i++){
let c = Object.values(b)
if(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase())){
 flag = true
 console.log(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase()))
}
else if(Number(company.companyid) == Number(arr[i])){
  flag = true
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


const filteredResult = result1.filter(filterTitleFunction)

 console.log(filteredResult,"filterresult")
const mappedUsers = filteredResult.map((company, index) => {
  let blockValue
  if(company.block){
    blockValue = "Unblock"
  }else blockValue = "Block"
    return `<div class="job">
    <h1>Company Details</h1>
    <p>Company Name: ${company.firstname} ${company.lastname} </p>
    <p>Email: <a href="mailto:${company.email}" target="_blank">${company.email}</a></p>
    <p>company id: ${company.companyid} </p>
    <p>phone: ${company.phone}</p>
    <button class="btns" id="blockbutton"> <a href="block.html?companyid=${company._id}&value=${!company.block}"> ${blockValue}</a></button><br/>       
  </div>`;
  });

console.log("mpusers",mappedUsers)
 if(mappedUsers.length>0){
   usersContainer.innerHTML = mappedUsers;
   if(mappedUsers.length < 3){
     const  ab = document.getElementById("footer");
      ab.classList.add("foot");
    }
}
 else{
   alert("Matching company not found");
 } 


});


  






