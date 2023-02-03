const $contactForm=document.getElementById("contact-send-form")

    console.log("contact info sent")
    const $name=document.getElementById("name").value
    const $email=document.getElementById("email").value
    const $message= document.getElementById("message").value ;
    $message = $name + "wants to contact and his message was";
   data = $message + data;
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: $contactForm.method,
        body: $message + data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          $contactForm.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    $contactForm.addEventListener("submit", handleSubmit)
   /* const result = await fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:$name,
            email:$email,
            message:$message
        })
    }).then((res) => res.json())
    console.log(result,result)
    if (!result.error) {
        $contactForm.reset()
        alert("success")
    } else {
        alert("unuble to submit")
    } */