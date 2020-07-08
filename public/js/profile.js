let inputMFA = $('#inputMFA');
let inputTerms = $('#inputTerms');
let inputLastName = document.querySelector('#inputLastname');
let inputFirstName = document.querySelector('#inputFirstname');
let inputEmail = document.querySelector('#staticEmail');
let submitSettings = document.querySelector('.update-settings-form');
let userId = document.querySelector('#sub').value;

document.addEventListener('DOMContentLoaded', async function(){
    let user = await fetch('/user/'+userId)
    .then((res) => res.json())
    .then((data) => data);

    (user.profile.mfa) ? inputMFA.bootstrapToggle('on') : inputMFA.bootstrapToggle('off');
    (user.profile.terms == "true") ? inputTerms.bootstrapToggle('on') : inputTerms.bootstrapToggle('off');
    inputLastName.value = user.profile.lastName;
    inputFirstName.value = user.profile.firstName;
    inputEmail.value = user.profile.login;
});

submitSettings.addEventListener('submit', async (e) => {
    e.preventDefault();

    let mfa = document.querySelector('#inputMFA').checked;
    let terms = document.querySelector('#inputTerms').checked;
    await fetch('/user', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            userId: userId,
            lastName: inputLastName.value,
            firstName: inputFirstName.value, 
            mfa: mfa, 
            terms: terms
        })
    })
    .then((res) => res.text())
    .then((data) => window.history.go());
});