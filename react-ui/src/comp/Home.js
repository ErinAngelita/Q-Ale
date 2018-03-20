import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';
import '../css/Home.css';
import '../css/Images/QALELOGO.png';

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
          <img id="logoImg" src={require("../css/Images/QALELOGO.png")} />
          {this.state.authenticated &&
            <div>
              <p id= "welcomeWords">Welcome back, {this.state.userinfo.name}!</p>
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
