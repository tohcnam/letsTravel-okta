let emailRequestForm = document.querySelector('.email-request-form');

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/emails', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            message: document.querySelector('#message').value, 
            email: document.querySelector('#email').value
        })
    })
        .then((res) => res.text())
        .then((data) => console.log(data));
});