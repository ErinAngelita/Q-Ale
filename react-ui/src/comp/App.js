import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback, render } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './auth/.samples.config.js';
import Navbar from './Navbar.jsx';
import LoginPage from './auth/LoginPage.js';
import Home from './Home';
import Profile from './Profile.jsx';
import CreateQuiz from './CreateQuiz';
import TextRoundInput1 from './TextRoundInput1.js';
import TextRoundInput2 from './TextRoundInput2.js';
import TextRoundInput3 from './TextRoundInput3.js';
import TextRoundInput4 from './TextRoundInput4.js';
import TextRoundInput5 from './TextRoundInput5.js';
import QuizReview from './QuizReview.js';
import Presentation from './Presentation.js';


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
      trivia_id: newTriviaId,
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
                path="/textroundinput1"
                render={() => <TextRoundInput1 trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/textroundinput2"
                render={() => <TextRoundInput2 trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/textroundinput3"
                render={() => <TextRoundInput3 trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/textroundinput4"
                render={() => <TextRoundInput4 trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/textroundinput5"
                render={() => <TextRoundInput5 trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/quizreview"
                render={() => <QuizReview trivia_id={this.state.trivia_id} /> } />
              <SecureRoute
                path="/presentation"
                render={() => <Presentation trivia_id={this.state.trivia_id} /> } />
            </Container>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
