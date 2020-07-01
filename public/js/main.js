let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHtml = `
        <div class="col-4">
        <div class="card">
            <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a class="btn btn-primary" href="/sight?id=${post.id}">Details</a>
            </div>
        </div>
      </div>
        `;
        articles.insertAdjacentHTML('beforeend', postHtml);
    })
});

callMeForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');
    await fetch('/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    })
        .then((res) => res.text())
        .then((data) => alert('We will call you back as soon as possible!'));
});