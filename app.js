const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const multer = require('multer');
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
let connectionString = 'mongodb://travel:Password123@demodb:27017/travel?authSource=travel&w=1';
mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(error => console.log(error));

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

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);

app.get('/', (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    res.render('index', {
      pageTitle: 'Lets Travel Homepage',
      isLoggedIn: !!userinfo,
      user: userinfo
    });
})

app.get('/sight', async (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    let date = new Date(post.date);
    res.render('sight', {
        pageTitle: post.title, 
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

    if(isLoggedIn && userinfo.groups && userinfo.groups.indexOf('customAdmins') > -1){
        res.render('admin', {
            pageTitle: 'Admin Page',
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
        pageTitle: 'Profile Page',
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
    let auth = req.body.auth;
    let terms = req.body.terms;
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
                    "auth": auth, 
                    "terms": terms
                }
            })
        })
        .then((resp) => resp.json())
        .then((data) => res.send('successful'))
        .catch(error => console.log('error', error));
    } else
        res.send('denied');
});

app.get('/registration', async (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    res.render('registration', {
        pageTitle: 'Registration',
        user: userinfo,
        isLoggedIn: !!userinfo
    })
});

app.post('/registration', async (req, res) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let terms = req.body.terms;

    let newUser = await fetch(baseUrl+'/api/v1/users?activate=true', {
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
                "email": email, 
                "login": email, 
                "primaryPhone": phone,
                "terms": terms.toString()
            },
            "groupIds": [
              "00g1hkt8owx7t9jBd0x7"
            ]
        })
    })
    .then((resp) => resp.json())
    .then((data) => data)
    .catch(error => {
        console.log('error', error)
        res.status(500).send('Registration failed')
    });
    if(process.env.AUTOENROLL_SMS){
        await fetch(baseUrl+'/api/v1/users/' + newUser.id + '/factors?activate=true', {
            method: 'POST', 
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "Authorization": 'SSWS ' + process.env.ADMINTOKEN
            }, 
            body: JSON.stringify({
                "factorType": "sms",
                "provider": "OKTA",
                "profile": {
                    "phoneNumber": phone
                }
            })
        })
        .then((resp) => resp.json())
        .then((data) => data)
        .catch(error => {
            console.log('error', error)
            res.status(500).send('Registration failed')
        });
    }
    res.send('successful')
});

let port = process.env.PORT;
app.listen(port, () => console.log('Listening on port '+ port));