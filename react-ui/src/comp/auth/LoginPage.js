import React, {Component} from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import Backbone from 'backbone';
import '../../css/LoginPage.css';
import config from './.samples.config.js';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = new OktaSignIn({
      baseUrl: config.oidc.issuer.split('/oauth2')[0],
      clientId: config.oidc.clientId,
      redirectUri: config.oidc.redirectUri,
      authParams: {
        responseType: ['id_token', 'token'],
        issuer: config.oidc.issuer,
        display: 'page',
        scopes: config.oidc.scope.split(' '),
      }
    });
  }

  componentDidMount() {
    this.signIn.renderEl(
      {el: '#sign-in-widget'},
      () => {
      },
      (err) => {
        throw err;
      }
    );
  }

  render() {
    return(
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}
