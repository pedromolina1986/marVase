//Listener to submit form.
document.getElementById('contact-form').addEventListener('submit', function (event) {
    // Prevent the form from submitting the traditional way
    event.preventDefault();

    const contactData = {
        name: { element: document.getElementById('name'), value: document.getElementById('name').value },
        email: { element: document.getElementById('email'), value: document.getElementById('email').value },
        message: { element: document.getElementById('message'), value: document.getElementById('message').value },
    }

    handleFormData(contactData);
});

//function to handle the form data and whaat to send to email
function handleFormData(contactData) {

    let submitMessage = document.getElementById("submitMessage");
    let newMessage = document.createElement("p");
    newMessage.textContent = "Thank you for your contact! I will get back to you ASAP!!! :)";
    newMessage.style.textAlign = "center";
    newMessage.style.color = "green";
    submitMessage.appendChild(newMessage);

    sendEmail(
        contactData.email.value,
        contactData.name.value,
        contactData.message.value
    );

    //success message
    setTimeout(() => {
        newMessage.remove();
    }, 3600);

    //clear content
    contactData.name.element.value = "";
    contactData.email.element.value = "";
    contactData.message.element.value = "";
}

//used mailjs account and template
async function sendEmail(email, name, message) {
    emailjs.init({
        publicKey: "fy6xUpfgMeSd4B0zi",
    });
    // Send email using EmailJS
    const response = await emailjs.send("service_cjzgb3j", "template_uwo7jy7", {
        name: name,
        email: email,
        message: message
    })
        .then(res => console.log("SUCCESS", res))
        .catch(err => console.log("ERROR", err));
}
