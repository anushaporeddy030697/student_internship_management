window.onload=async()=>{
    console.log("onload")
    const url = window.location.href
    const applicationId = url.split('=')
    const result = await fetch(`/shortlistqualified?applicationid=${applicationId[1]}`, {
        method: 'DELETE',
        headers: {
           
            'Authorization':'Bearer '+localStorage.getItem('token')
        },
        
    }).then((res) => res.json())
    console.log(result)
    alert("Accepted successfully!")
    window.location = "viewshortlists.html"

} 