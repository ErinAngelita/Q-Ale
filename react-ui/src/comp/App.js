import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import CreateQuiz from './CreateQuiz';
import TextRoundInput from './TextRoundInput.js';
import HomePage from './HomePage.js';
import LoginPage from '../containers/LoginPage.js';
import LogoutFunction from '../containers/LogoutFunction.js';
import SignUpPage from '../containers/SignUpPage.js';
import DashboardPage from '../containers/DashboardPage.js';
import Auth from '../modules/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trivia_id: "",
      authenticated: false
    };
  }

  updateTriviaId(newId) {
    this.setState({
      trivia_id: newId
    });
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  render() {
    return (
      <Router>
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <Link to="/">React App</Link>
          </div>
          {this.state.authenticated ? (
            <div className="top-bar-right">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Log out</Link>
            </div>
          ) : (
            <div className="top-bar-right">
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </div>

          <Container text style={{ marginTop: '7em'}}>
            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
            <PrivateRoute path="/quiz" updateTriviaId={this.updateTriviaId.bind(this)} trivia_id={this.state.trivia_id} component={CreateQuiz}/>
            <Route path="/round" component={TextRoundInput} />
          </Container>
      </div>
      </Router>
    );
  }
}
