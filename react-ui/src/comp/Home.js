import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {

    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          <Header as="h1">Custom Login Page with Sign In Widget</Header>
          {this.state.authenticated &&
            <div>
              <p>Welcome back, {this.state.userinfo.name}!</p>
              <p>
                You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
                Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
              </p>
              <h3>Next Steps</h3>
              <p>Currently this application is a stand-alone front end application.  At this point you can use the access token to authenticate yourself against resource servers that you control.</p>
              <p>This sample is designed to work with one of our resource server examples.  To see access token authentication in action, please download one of these resource server examples:</p>
              <p>Once you have downloaded and started the example resource server, you can visit the <a href="/createquiz">Create Quiz</a> page to see the authentication process in action.</p>
            </div>
          }
          {!this.state.authenticated &&
            <div>
              <Button id="login-button" primary onClick={this.props.auth.login}>Login</Button>
            </div>
          }
        </div>
        }
      </div>
    );
  }
});
