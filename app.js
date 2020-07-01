let express = require('express');
let app =  express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/post').Post;
let auth = require('./controllers/auth');


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.json());

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'));

app.use(express.static('public'));
app.use(cookieParser());

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    let date = new Date(post.date);
    res.render('sight', {
        title: post.title, 
        imageURL: post.imageURL, 
        date: date.toLocaleString(),
        text: post.text
    })
});

app.get('/admin', (req, res) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token))
        res.render('admin');
    else
        res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

const PORT = 3000;
app.listen(PORT, () => console.log('Listening on port '+PORT));