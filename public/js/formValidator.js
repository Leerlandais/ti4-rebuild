
const checkoutForm = document.getElementById("checkoutForm");
const formElements = checkoutForm.querySelectorAll("input");
const formData = {};

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (e) => {
    removeBasket(currentBasket);
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
    });
    submitButton.disabled = !allValid;
    submitButton.disabled ? submitButton.style.opacity = "0.5" : submitButton.style.opacity = "1";
    submitButton.disabled ? submitButton.textContent = "Complete the delivery form to continue" : "Place Order";
}

function isValidEmail(mail) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.test(mail);
}

validateForm();

