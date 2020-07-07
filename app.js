const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const url = require('url');
const fetch = require('node-fetch');

let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let Post = require('./models/post').Post;
let auth = require('./controllers/auth');
const baseUrl = url.parse(process.env.ISSUER).protocol + '//' + url.parse(process.env.ISSUER).host;

app.set('view engine', 'ejs');
dotenv.config();
mongoose.connect('mongodb://localhost/travels', { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.json());

// session support is required to use ExpressOIDC
app.use(session({
    secret: 'this should be secure',
    resave: true,
    saveUninitialized: false
}));

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(auth.oidc.router);

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

app.get('/', (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    res.render('index', {
      isLoggedIn: !!userinfo,
      userinfo: userinfo
    });
})

app.get('/sight', async (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    let date = new Date(post.date);
    res.render('sight', {
        title: post.title, 
        imageURL: post.imageURL, 
        date: date.toLocaleString(),
        text: post.text,
        user: userinfo,
        isLoggedIn: !!userinfo
    })
});

app.get('/admin', auth.oidc.ensureAuthenticated(), (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    let isLoggedIn = !!userinfo;

    if(isLoggedIn && userinfo.travelGroups && userinfo.travelGroups[0] === 'travelAdmin'){
        res.render('admin', {
            user: userinfo,
            isLoggedIn: isLoggedIn
        })
    } else {
        res.status(401);
        res.send('Rejected, not enough rights!');
    }
});

app.get('/profile', auth.oidc.ensureAuthenticated(), (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    const tokens = req.userContext && req.userContext.tokens;
    res.render('profile', {
        user: userinfo,
        isLoggedIn: !!userinfo,
        tokens: tokens
    });
});

app.get('/user/:id', auth.oidc.ensureAuthenticated(), async (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    let userId = userinfo.sub;

    if(userId === req.params.id){
        await fetch(baseUrl+'/api/v1/users/'+userId, {
            method: 'GET', 
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "Authorization": 'SSWS ' + process.env.ADMINTOKEN
            }
        })
        .then((resp) => resp.json())
        .then((data) => res.send(JSON.stringify(data)))
        .catch(error => console.log('error', error));
    }
});

app.post('/user', auth.oidc.ensureAuthenticated(), async (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mfa = req.body.mfa;
    let userId = userinfo.sub;

    if(userId === req.body.userId){
        await fetch(baseUrl+'/api/v1/users/'+userId, {
            method: 'POST', 
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "Authorization": 'SSWS ' + process.env.ADMINTOKEN
            }, 
            body: JSON.stringify({
                "profile": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "mfa": mfa
                }
            })
        })
        .then((resp) => resp.json())
        .then((data) => res.send('successful'))
        .catch(error => console.log('error', error));
    } else
        res.send('denied');
});

let port = process.env.PORT;
app.listen(port, () => console.log('Listening on port '+port));