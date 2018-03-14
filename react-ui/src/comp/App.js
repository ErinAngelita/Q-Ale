import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback, render } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './auth/.samples.config.js';
import Navbar from './Navbar.jsx';
import Header from './Header.js';
import Main from './Main.js';
import LoginPage from './auth/LoginPage.js';
import Home from './Home';
import Profile from './Profile.jsx';
import TextRoundInput from './TextRoundInput.js';
import CreateQuiz from './CreateQuiz';

function customAuthHandler ({ history }) {
  history.push('/login');
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      trivia_id: "",
    };
  }

  updateTriviaId(newTriviaId){
    this.setState({
      trivia_id:newTriviaId,
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Security
            issuer={config.oidc.issuer}
            client_id={config.oidc.clientId}
            redirect_uri={config.oidc.redirectUri}
            onAuthRequired={customAuthHandler}>
            <Navbar />
            <Container text style={{ marginTop: '7em'}}>
              <Route path="/" exact component={Home} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/login" component={LoginPage} />
              <SecureRoute
                path="/createquiz"
                render={() => <CreateQuiz trivia_id={this.state.trivia_id} updateTriviaId={this.updateTriviaId.bind(this)} /> } />
              <SecureRoute path="/profile" component={Profile} />
              <SecureRoute
                path="/textroundinput"
                render={() => <TextRoundInput trivia_id={this.state.trivia_id} /> } />
            </Container>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
