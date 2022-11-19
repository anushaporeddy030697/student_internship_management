const $contactForm=document.getElementById("contact-send-form")

$contactForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("contact info sent")
    const $name=document.getElementById("name").value
    const $email=document.getElementById("email").value
    const $message=document.getElementById("message").value

    const result = await fetch('/contact', {
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
    }
})