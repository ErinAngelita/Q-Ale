import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Container, Icon, Image, Menu } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';
import '../css/NavBar.css';

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      trivia_id: ""
    };
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
        <Menu fixed="top" inverted>
          <Container id="navMenu">
            <Menu.Item id="qaleButton" as="a" header href="/">
              Q&Ale
            </Menu.Item>
            {this.state.authenticated === true && <Menu.Item id="createquiz-button" as="a" href="/createquiz" ><Icon name="mail outline" /> Create Quiz </Menu.Item>}
            {this.state.authenticated === true && <Menu.Item id="profile-button" as="a" href="/myquizzes"> My Quizzes </Menu.Item>}
            {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.props.auth.logout}> Logout </Menu.Item>}
            {this.state.authenticated === false && <Menu.Item as="a" onClick={this.props.auth.login}> Login </Menu.Item>}
          </Container>
        </Menu>
      </div>
    );
  }
});
