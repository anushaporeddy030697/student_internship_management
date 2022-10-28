if((!localStorage.getItem("token")) && (localStorage.getItem('usertype')!=='company')){
    location.href="/company/companyLogin.html"
}