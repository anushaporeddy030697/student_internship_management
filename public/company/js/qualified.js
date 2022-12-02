window.onload=async()=>{
    console.log("onload")
    const url = window.location.href
    const applicationId = url.split('=')
    const result = await fetch(`/qualified?applicationid=${applicationId[1]}`, {
        method: 'PATCH',
        headers: {
           
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        
    }).then((res) => res.json())
    console.log(result)
    alert("success")
    window.location = "viewapplications.html"

} 