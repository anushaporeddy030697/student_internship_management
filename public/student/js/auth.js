console.log(localStorage.getItem("token"))
if(!(localStorage.getItem("token"))){
    location.href="/student/login.html"
}