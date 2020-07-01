let articlesBlock = document.querySelector('.articles');

articlesBlock.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/posts/'+id, {
            method: 'DELETE'
        })
            .then((response) => response.text)
            .then(() => window.history.go());
    }
});