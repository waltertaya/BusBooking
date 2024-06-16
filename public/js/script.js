document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector(".submit-button");
    const formFields = document.querySelectorAll("#firstname, #lastname, #phone, #idpassport, #nationality, #fullname, #mpesa");
    const termsCheckbox = document.querySelector("#terms");

    function checkFormCompletion() {
        let allFieldsFilled = true;

        formFields.forEach(function(field) {
            if (field.value.trim() === "" || (field.tagName === "SELECT" && field.value === "")) {
                allFieldsFilled = false;
            }
        });

        if (allFieldsFilled && termsCheckbox.checked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    formFields.forEach(function(field) {
        field.addEventListener("input", checkFormCompletion);
    });

    termsCheckbox.addEventListener("change", checkFormCompletion);
});