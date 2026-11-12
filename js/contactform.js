//Select the contact form and the feedback message paragraph from contact.html
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

//Listen for when the user submits the contact form
contactForm.addEventListener("submit", function (event) {
    //Stop the browser from reloading the page so JavaScript can validate the inputs first
    event.preventDefault();

    //Grab the values typed into each input field and remove extra spaces at the start/end
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation 1: Ensure none of the four fields are left empty
    if (name === "" || email === "" || phone === "" || message === "") {
        showFeedback("Please fill in all fields.", "error");
        return; // Stop running the function if any field is blank
    }

    //Validation 2: Check that the email follows a standard format (e.g. name@domain.com)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        return; // Stop if the email format is invalid
    }

    // Validation 3: Ensure the phone number contains only numeric digits (0-9)
    const digitsOnly = /^\d+$/;
    if (!digitsOnly.test(phone)) {
        showFeedback("Phone number must contain only digits.", "error");
        return; //Stop if letters, spaces, or symbols are present
    }

    //If all checks pass, display a confirmation message and clear the form inputs
    showFeedback("Thank you! Your message has been sent.", "success");
    contactForm.reset();
});

//Helper function to display validation errors or success messages on the screen
function showFeedback(text, type) {
    feedback.textContent = text;
    //Set the CSS class to either "error" (red text) or "success" (green text)
    feedback.className = type;
}
