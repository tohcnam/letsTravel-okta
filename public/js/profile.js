let inputMFA = $('#inputMFA');
let inputTerms = $('#inputTerms');
let inputLastName = document.querySelector('#inputLastname');
let inputFirstName = document.querySelector('#inputFirstname');
let inputEmail = document.querySelector('#staticEmail');
let submitSettings = document.querySelector('.update-settings-form');
let userId = document.querySelector('#sub').value;
let accessToken = document.querySelector('#access_token');
let divAccessToken = document.querySelector('.accessTokenParsed');
let idToken = document.querySelector('#id_token');
let divIdToken = document.querySelector('.idTokenParsed');

// for IDnow demo
let startVerificationProcess = document.querySelector('.verification-form');
let idNowID = '';
let inputVerificationStatus = document.querySelector('#inputVerificationStatus');
let inputVerificationID = document.querySelector('#inputVerificationID');
let btnVerificationStart = document.querySelector('.verificationSubmit');

document.addEventListener('DOMContentLoaded', async function(){
    let user = await fetch('/user/'+userId)
    .then((res) => res.json())
    .then((data) => data);

    (user.profile.mfa) ? inputMFA.bootstrapToggle('on') : inputMFA.bootstrapToggle('off');
    (user.profile.terms == "true") ? inputTerms.bootstrapToggle('on') : inputTerms.bootstrapToggle('off');
    inputLastName.value = user.profile.lastName;
    inputFirstName.value = user.profile.firstName;
    inputEmail.value = user.profile.login;

    let parsedAccessToken = parseJwt(accessToken.value);
    divAccessToken.textContent = JSON.stringify(parsedAccessToken, undefined, 2);
    let parsedIdToken = parseJwt(idToken.value);
    divIdToken.textContent = JSON.stringify(parsedIdToken, undefined, 2);

    // for IDnow demo
    idNowID = user.profile.idnow_id;
    inputVerificationID.value = idNowID;
    let status = user.profile.idnow_status;
    if(status=='SUCCESS' || status == "SUCCESS_DATA_CHANGED"){
        inputVerificationStatus.value = status;
        btnVerificationStart.style.display = "none";
    } else {
        inputVerificationStatus.value = "Unidentified";
        btnVerificationStart.style.display = "block";
    }
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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// for IDnow demo
startVerificationProcess.addEventListener('submit', (e) => {
    e.preventDefault();
    let link = 'https://go.idnow.de/oktatestauto/identifications/' + idNowID + '/mobile';
    window.open(link, '_blank');
});
