// console.log(localStorage.getItem("token"))
// if(!(localStorage.getItem("token"))){
//     location.href="/student/login.html"
// }

const coockievalue=document.cookie
if(!coockievalue){
    location.href="/student/Login.html"
}

(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

// const coockievalue=document.cookie
// const coockieArray=coockievalue.split(";")
// // console.log(coockieArray)
// const auth=coockieArray[0].split("=") 
// const type=coockieArray[1].split("=")

// window.onload=()=>{
//     if(!auth || type !=student){
//         location.href="/"
//     }
// }