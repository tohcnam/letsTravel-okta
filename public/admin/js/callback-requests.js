async function getCallbackRequests(){
    return await fetch('/callback-requests')
            .then((response) => response.json())
            .then((data) => data);
};

let requestBlock = document.querySelector('#v-pills-callback');

requestBlock.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/'+id, {
            method: 'DELETE'
        })
            .then((response) => response.text)
            .then(() => window.history.go());
    }
});