const { ExpressOIDC } = require('@okta/oidc-middleware');
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();

const oidcMiddlewareConfig = {
    routes: {
      login: {
        path: '/signin',
        viewHandler: (req, res) => {
          const baseUrl = url.parse(process.env.ISSUER).protocol + '//' + url.parse(process.env.ISSUER).host;
          // Render your custom login page, you must create this view for your application and use the Okta Sign-In Widget
          res.render('custom-login', {
            csrfToken: req.csrfToken(),
            baseUrl: baseUrl, 
            issuer: process.env.ISSUER,
            redirect_uri: process.env.REDIRECT_URI
          });
        }
      }
    }
};


const oidc = new ExpressOIDC(Object.assign({
    issuer: process.env.ISSUER,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    appBaseUrl: process.env.APPBASEURL,
    scope: process.env.SCOPE
}, oidcMiddlewareConfig));   


// module.exports = { generateToken, checkToken }; 
module.exports = { oidc };