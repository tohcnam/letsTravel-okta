async function getPosts(){
    return await fetch('http://localhost:3000/posts')
            .then((response) => response.json())
            .then((data) => data);
}