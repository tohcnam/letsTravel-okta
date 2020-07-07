let csrfToken = document.querySelector('#csrfToken');
let baseUrl = document.querySelector('#baseUrl');
let issuer = document.querySelector('#issuer')
let defaultThemeBtn = document.querySelector('.default-theme-btn');
let backgroundThemeBtn = document.querySelector('.background-theme-btn');
let darkThemeBtn = document.querySelector('.dark-theme-btn');
let minimalThemeBtn = document.querySelector('.minimal-theme-btn');

document.addEventListener('DOMContentLoaded', async function(){
  const signIn = new OktaSignIn({
    baseUrl: baseUrl.value, 
    logo: '/images/logo.png',
    features: {
      registration: true,
      rememberMe: true
    },
    authParams: {
      pkce: true, 
      issuer: issuer.value
    }
  });

  signIn.renderEl({ el: '#app-container' }, (res) => {
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = '/login';
    document.body.append(form);

    let sessionTokenField = document.createElement('input');
    sessionTokenField.type = ('hidden');
    sessionTokenField.name = ('sessionToken');
    sessionTokenField.value = (res.session.token);

    let csrfTokenField = document.createElement('input');
    csrfTokenField.type = 'hidden';
    csrfTokenField.name = '_csrf';
    csrfTokenField.value = csrfToken.value;

    form.appendChild(sessionTokenField);
    form.appendChild(csrfTokenField);

    baseUrl.remove();
    csrfToken.remove();
    issuer.remove();

    form.submit();

  }, (err) => {
    console.error(err);
  });
});

function swapStyleSheet(sheet) {
  document.getElementById("themeStyle").setAttribute("href", sheet);  
}

defaultThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-default.css')
});
backgroundThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-background.css')
});
darkThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-dark.css')
});
minimalThemeBtn.addEventListener('click', () => {
  swapStyleSheet('/css/okta-theme-minimal.css')
});