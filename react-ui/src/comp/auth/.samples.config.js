export default {
  oidc: {
    clientId: '0oae6giclrPt2JoAt0h7',
    issuer: 'https://dev-398658.oktapreview.com',
    // removed (/oauth2/default) from end of issuer
    //Okta can only accept one absolute redirect URI (http://localhost:3000/implicit/callback)
    redirectUri: 'https://enigmatic-coast-39458.herokuapp.com/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/messages',
  },
};
