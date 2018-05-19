import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'larayb.auth0.com',
    clientID: 'AI22CUqvw7Zo9jBch62EGf04BA634CeI',
    redirectUri: 'http://larayb.com/callback',
    audience: 'https://larayb.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile',
  });
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    // this.getProfile = this.getProfile.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getUserbasicInfo = this.getUserbasicInfo.bind(this);
  }

  handleAuthentication() {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       this.setSession(authResult);
       this.auth0.client.userInfo(localStorage.getItem('access_token'), function(err, profile) {
          console.log(profile);
           localStorage.setItem('name', profile.name);
           localStorage.setItem('user_id', profile.sub);
       });
       // history.replace('/home');
     } else if (err) {
       // history.replace('/home');
       console.log(err);
     }
   });
 }

 getUserbasicInfo(cb){
   console.log(localStorage.getItem('access_token'));
   this.auth0.client.userInfo(localStorage.getItem('access_token'), function(err, profile) {
     cb(err, profile);
   });
 }

 setSession(authResult) {
   // Set the time that the Access Token will expire at
   console.log(authResult);
   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   localStorage.setItem('access_token', authResult.accessToken);
   localStorage.setItem('id_token', authResult.idToken);
   localStorage.setItem('expires_at', expiresAt);
   // navigate to the home route
   // history.replace('/home');
 }

 logout() {
   // Clear Access Token and ID Token from local storage
   localStorage.removeItem('access_token');
   localStorage.removeItem('id_token');
   localStorage.removeItem('expires_at');
   localStorage.removeItem('given_name');
   // navigate to the home route
   // history.replace('/home');
 }

 isAuthenticated() {
   // Check whether the current time is past the
   // Access Token's expiry time
   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
   return new Date().getTime() < expiresAt;
 }

  login() {
    this.auth0.authorize();
  }
}
