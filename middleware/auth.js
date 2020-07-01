let auth = require('../controllers/auth');

function checkAuth(req, res, next){
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        next();
    } else {
        res.status(401);
        res.send('Not authorized');
    }
};

module.exports = checkAuth;