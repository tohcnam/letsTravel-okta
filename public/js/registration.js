let inputTerms = document.querySelector('#inputTerms');
let inputPhone = document.querySelector('#inputPhone');
let inputLastName = document.querySelector('#inputLastname');
let inputFirstName = document.querySelector('#inputFirstname');
let inputEmail = document.querySelector('#inputEmail');
let submitRegistration = document.querySelector('.registration-form');
let wrapperRegistration = document.querySelector('.registration-wrapper');
let successRegistration = document.querySelector('.registration-success');

submitRegistration.addEventListener('submit', async (e) => {
    e.preventDefault();

    await fetch('/registration', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email: inputEmail.value,
            lastName: inputLastName.value,
            firstName: inputFirstName.value, 
            phone: inputPhone.value, 
            terms: inputTerms.checked
        })
    })
    .then((res) => res.text())
    .then((data) => {
        wrapperRegistration.style.display = 'none';
        successRegistration.style.display = 'block';
    });
});