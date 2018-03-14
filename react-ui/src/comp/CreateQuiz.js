import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';

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

  passToApp(mereow) {
    this.props.updateTriviaId(mereow)
  }

  handleChange( event ) {
    console.log( event.target.value );
    this.setState( {text: event.target.value} );
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
        name: document.getElementById( "quizname" ).value,
        date: document.getElementById( "date" ).value
      })
    })
    .then((res) =>
      res.json())
    .then((data) => {
      this.passToApp(data);
    })
    this.props.auth._history.push("/textroundinput")
  }
  render() {
    return(
      <div>
        <p>
          {this.props.trivia_id}
        </p>
      <form onSubmit = {this.handleSubmit}>
        <label> Quizname:
          <input id="quizname" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label> Date:
          <input id="date" type="date" />
        </label>
        <label> Round Category:
          <input id="roundcategory" type="text" value={this.state.value} />
        </label>
        <ul>
          <input id="question1" type="text" value={this.state.value} />
          <input id="answer1" type="text" value={this.state.value} />
          <input id="question2" type="text" value={this.state.value} />
          <input id="answer2" type="text" value={this.state.value} />
          <input id="question3" type="text" value={this.state.value} />
          <input id="answer3" type="text" value={this.state.value} />
          <input id="question4" type="text" value={this.state.value} />
          <input id="answer4" type="text" value={this.state.value} />
          <input id="question5" type="text" value={this.state.value} />
          <input id="answer5" type="text" value={this.state.value} />
          <input id="question6" type="text" value={this.state.value} />
          <input id="answer6" type="text" value={this.state.value} />
          <input id="question7" type="text" value={this.state.value} />
          <input id="answer7" type="text" value={this.state.value} />
          <input id="question8" type="text" value={this.state.value} />
          <input id="answer8" type="text" value={this.state.value} />
          <input id="question9" type="text" value={this.state.value} />
          <input id="answer9" type="text" value={this.state.value} />
          <input id="question10" type="text" value={this.state.value} />
          <input id="answer10" type="text" value={this.state.value} />
        </ul>
        <label> Round Category:
          <input id="roundcategory" type="text" value={this.state.value} />
        </label>
        <ul>
          <input id="question11" type="text" value={this.state.value} />
          <input id="answer11" type="text" value={this.state.value} />
          <input id="question12" type="text" value={this.state.value} />
          <input id="answer12" type="text" value={this.state.value} />
          <input id="question13" type="text" value={this.state.value} />
          <input id="answer13" type="text" value={this.state.value} />
          <input id="question14" type="text" value={this.state.value} />
          <input id="answer14" type="text" value={this.state.value} />
          <input id="question15" type="text" value={this.state.value} />
          <input id="answer15" type="text" value={this.state.value} />
          <input id="question16" type="text" value={this.state.value} />
          <input id="answer16" type="text" value={this.state.value} />
          <input id="question17" type="text" value={this.state.value} />
          <input id="answer17" type="text" value={this.state.value} />
          <input id="question18" type="text" value={this.state.value} />
          <input id="answer18" type="text" value={this.state.value} />
          <input id="question19" type="text" value={this.state.value} />
          <input id="answer19" type="text" value={this.state.value} />
          <input id="question20" type="text" value={this.state.value} />
          <input id="answer20" type="text" value={this.state.value} />
        </ul>
        <input type="submit" value="Create Quiz!" />
      </form>
      </div>
    );
  }
})
