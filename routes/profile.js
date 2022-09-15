const fetch = require("node-fetch");
const url = require("url");
let express = require("express");
let router = express.Router();
let auth = require("../controllers/auth");
const baseUrl = url.parse(process.env.ISSUER).protocol + "//" + url.parse(process.env.ISSUER).host;

router.post("/delete", auth.oidc.ensureAuthenticated(), async (req, res) => {
  const userinfo = req.userContext && req.userContext.userinfo;

  // need to call delete twice since first delete will suspend the profile
  // the second call will finally delete it
  try {
    console.log(`suspending user ${userinfo.sub}`);
    await fetch(baseUrl + "/api/v1/users/" + userinfo.sub, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "SSWS " + process.env.ADMINTOKEN,
      },
    });
    console.log(`suspended user ${userinfo.sub}`);
  } catch (error) {
    console.log(`failed to suspend user ${userinfo.sub}`);
  }
  try {
    console.log(`deleting user ${userinfo.sub}`);
    await fetch(baseUrl + "/api/v1/users/" + userinfo.sub, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "SSWS " + process.env.ADMINTOKEN,
      },
    });
    console.log(`deleted user ${userinfo.sub}`);
  } catch (error) {
    console.log(`failed to delete user ${userinfo.sub}`);
  }
  // log the user out of the local application
  req.session.destroy();
  // redirect the user to the homepage
  res.redirect("/");
});
module.exports = router;
