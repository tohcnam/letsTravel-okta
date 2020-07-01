let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;

    fetch('/users/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => {
        if(res.status === 400){
            throw new Error();
        }
        return res.json()
    })
    .then((data) => {
        window.location.href = data.redirectURL;
    })
    .catch(() => alert('Wrong Email or Password'));
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;
    if(password!==rePassword){
        return;
    }

    fetch('/users/register', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) => res.text())
    .then((data) => alert(data));

});
