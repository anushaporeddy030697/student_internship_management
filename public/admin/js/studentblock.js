window.onload=async()=>{
    console.log("onload")
    const url = window.location.href
    const temp = url.split('=')
    const studentid = temp[1].split('&')
    const blockValue = temp[2]
    console.log("block valure " + blockValue)
    const result = await fetch(`/studentblock?studentid=${studentid[0]}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        body:JSON.stringify({ 
           block:blockValue
        })
        
    }).then((res) => res.json())
    console.log(result)
    alert("success")
    window.location = "viewapplications.html"

} 