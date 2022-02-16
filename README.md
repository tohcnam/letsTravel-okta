# letsTravel
This project is an example to demonstrate how to use the Okta NodeJS middelware for authentication with a custom login page and a user profile page. 

# Getting Started
To install this example application, run the following commands:
```bash
git clone https://github.com/tohcnam/letsTravel.git
cd letsTravel
```

This will get a copy of the project install locally. You will need to set up some environment variables before the app will run properly.

To integrate Okta's Identity Platform for user authentication, you'll first need to:

* [Sign up for a free Okta Developer account](https://www.okta.com/developer/signup/)
* You will get a URL similar to https://dev-123456.oktapreview.com.
  * Save this URL for later
  * You will also use this URL to login to your Okta account

You will need to create an application in Okta:

* Log in to your Okta account, then navigate to **Applications** and click the **Add Application** button
* Select **Web** and click **Next**
* Give your application a name (e.g. "Simple Node Authentication")
* Change the **Base URI** to `http://localhost:3000` and the **Login redirect URI** to `http://localhost:3000/authorization-code/callback`, then click **Done**
* Save your **client ID** and **client secret** for later

You will also need one API token:

* Log in to your Okta account, then navigate to **API > Tokens** and click the **Create Token** button
* Enter a name that will help you remember what this is used for
* Save the provided **token value** for later
  * This will only be displayed once. If you lose it, you will need to create another API token

Now create a file called `.env` in the project root and add the following variables, replacing the values with your own from the previous steps.

```bash
PORT=3000
ISSUER=okta-authorization-server-issure-uri
ISSUER_BASE=https://yourOktaTenant.okta.com
CLIENT_ID=okta-application-client-id
CLIENT_SECRET=okta-application-client-secret
CUSTOM_LOGIN=false
REDIRECT_URI=http://localhost:3000/authorization-code/callback
APPBASEURL=http://localhost:3000
SCOPE="openid profile read:demo offline_access"
ADMINTOKEN=okta-api-token
CUSTOM_REGISTRATION=false
```

### Requirements

#### Custom user attributes

The app also assumes users have `MFA` (bool) and `terms` (String enum true and false) custom user attributes. Those need to be added from the Okta Developer Console by going to **Directory > Profile Editor**, then click the **Profile** button on the profile labeled **User**. Click **Add Attribute**, then give it a display name like `MFA` and a variable name of `mfa` (case sensitive). Click **Save and Add Another** to add another one with display name like `Terms and Services` and variable name `terms`, then click **Save**. The rest of the options can stay at the default. 

#### Custom groups and MFA rule

The app also assumes that the groups `MFAOptIn` and `customAdmins` are created. Those need to be added from the Okta Developer Console by going to **Directory > Groups**, then click on **Add Group** button and create those two groups (case sensitive). Go to **Rules > Add Rule** and crate a rule. **IF**: with the Okta Expression Language `user.mfa==true` and **THEN** assign to `MFAOptIn`.  
Everybody who is in the `customAdmins` group will alter be able to access the `Admin` page in the application. 

#### Custom authorization settings (scopes and claims)

The app also assumes that the authorization server has the custom scope `demoScope`. Go to **Security > API > yourAuthServer > Scopes** and **Add Scope** the custom scope `demoScope`.  
To to **Claims** and **Add Claim** the custom claims `MFA`, `terms` and `groups`. For the claim `MFA` and `terms` choose `ID Token`, value `user.mfa` and add to the scope `demoScope`. For the claim `groups` choose `ID token`, value type `Groups`, filter `Matches regex` with value `.*` and add to the scope `demoScope`. 

### Run

To run this app Docker and Docker-Compose is required. 

Now run the application:
```bash
./exec.sh
```

## Links

Here are some links that were helpful in the creation of this example:

* Libraries
  * [Okta OpenID Connect Middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware)
  * [Okta Node SDK](https://github.com/okta/okta-sdk-nodejs)
  * [Express](https://github.com/expressjs/express)
* Blogs
  * [Build User Registration with Node, React, and Okta](https://developer.okta.com/blog/2018/02/06/build-user-registration-with-node-react-and-okta)
  * [Build a Basic CRUD App with Vue.js and Node](https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node)
