import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import '../css/CreateQuiz.css';
import logo from '../css/Images/QALELOGO.png';

export default withAuth(class CreateQuiz extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      text: " ",
      userinfo: null,
      authenticated: null,
    };
    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
    this.checkAuthentication = checkAuthentication.bind( this );
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  passToApp(triviaToApp) {
    this.props.updateTriviaId(triviaToApp)
  }

  handleChange( event ) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit( event ) {
    event.preventDefault();
    fetch( '/api/createquiz', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenSub: this.state.userinfo.sub,
        name: document.getElementById( "quizName" ).value,
        date: document.getElementById( "date" ).value
      })
    })
    .then((res) =>
      res.json())
    .then((data) => {
      this.passToApp(data);
    })
    this.props.auth._history.push("/textroundinput1")
  }

  render() {
    return(
      <div>
        <img id="logoImg" src={logo} />
        <form id="createForm" onSubmit = {this.handleSubmit}>
          <ul>
            <label id="quizNameLabel" > Quiz Name:
              <input id="quizName" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br/>
            <label id="dateLabel"> Date:
              <input id="date" type="date" />
            </label>
          </ul>
          <input id="submitButton" type="submit" value="Create Quiz!" />
        </form>
      </div>
    );
  }
})
