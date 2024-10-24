
const checkoutForm = document.getElementById("checkoutForm");
const formElements = checkoutForm.querySelectorAll("input");
const formData = {};
const submitButton = document.getElementById("submitButton");

 showTest ? logThis("Submit button has been disabled until completion of form", true) : null;

submitButton.addEventListener("click", (e) => {
    completeCheckoutOperation();
    alert("Your order has been successfully submitted!");

})

formElements.forEach(element => {
    const key = element.id
    if (key) {
        formData[key] = element;
        element.addEventListener("input", validateForm);
    }
});


function validateForm() {
    let allValid = true;
    formElements.forEach(element => {
        if (!element.value.trim()) {
            allValid = false;
        }

        if (element.type === "email" && !isValidEmail(element.value)) {
            allValid = false;
        }
        if (element.id === "phone" && !isValidPhone(element.value)) {
            allValid = false;
        }

        if (!testBasketLength()) {
            allValid = false;
        }
    });

    submitButton.disabled = !allValid;
    if (submitButton.disabled) {
        submitButton.style.opacity = "0.5";
        submitButton.textContent = "Complete the delivery form to continue";
    }else{
        submitButton.style.opacity = "1";
        submitButton.textContent = "Submit Order";
        showTest ? logThis("Submit Button has been activated", true) : null;
    }
}

function isValidEmail(mail) {
    // verify that the email seems valid
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.test(mail);
}

function isValidPhone(phone) {
    // verify that the phone number seems valid
    const num = /^[0-9]{8,12}$/;
    return num.test(phone.replace(/ /g, ""));
}

function testBasketLength() {
    // don't permit submission if basket is empty
    return localStorage.getItem("BASKET");
}
validateForm();

