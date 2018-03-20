import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import '../css/TextRoundInput5.css';

export default withAuth(class TextRoundInput5 extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      text: " ",
      userinfo: null,
      authenticated: null,
    };
    this.handleSubmit = this.handleSubmit.bind( this );
    this.checkAuthentication = checkAuthentication.bind( this );
  }

  async componentDidMount() {
      this.checkAuthentication();
  }

  async componentDidUpdate() {
      this.checkAuthentication();
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/textroundinput/' + this.props.trivia_id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: document.getElementById("roundcategory").value,
        question1: document.getElementById("question1").value,
        answer1: document.getElementById("answer1").value,
        question2: document.getElementById("question2").value,
        answer2: document.getElementById("answer2").value,
        question3: document.getElementById("question3").value,
        answer3: document.getElementById("answer3").value,
        question4: document.getElementById("question4").value,
        answer4: document.getElementById("answer4").value,
        question5: document.getElementById("question5").value,
        answer5: document.getElementById("answer5").value,
        question6: document.getElementById("question6").value,
        answer6: document.getElementById("answer6").value,
        question7: document.getElementById("question7").value,
        answer7: document.getElementById("answer7").value,
        question8: document.getElementById("question8").value,
        answer8: document.getElementById("answer8").value,
        question9: document.getElementById("question9").value,
        answer9: document.getElementById("answer9").value,
        question10: document.getElementById("question10").value,
        answer10: document.getElementById("answer10").value,
      })
    })
    this.props.auth._history.push("/quizreview")
  }

  render() {
    return(
      <div>
        <p>
          Round 5
        </p>
        <form id="RoundCat" onSubmit = {this.handleSubmit}>
          <label > Round Category:
            <input id="roundcategory" type="text" value={this.state.value} />
          </label>
          <ul id="QuestionList">
            Question 1:<input className="question" id="question1" type="text" value={this.state.value} />
            Answer 1:<input className="answer" id="answer1" type="text" value={this.state.value} />
            <br/>
            Question 2:<input className="question" id="question2" type="text" value={this.state.value} />
            Answer 2:<input className="answer" id="answer2" type="text" value={this.state.value} />
            <br/>
            Question 3:<input className="question" id="question3" type="text" value={this.state.value} />
            Answer 3:<input className="answer" id="answer3" type="text" value={this.state.value} />
            <br/>
            Question 4:<input className="question" id="question4" type="text" value={this.state.value} />
            Answer 4:<input className="answer" id="answer4" type="text" value={this.state.value} />
            <br/>
            Question 5:<input className="question" id="question5" type="text" value={this.state.value} />
            Answer 5:<input className="answer" id="answer5" type="text" value={this.state.value} />
            <br/>
            Question 6:<input className="question" id="question6" type="text" value={this.state.value} />
            Answer 6:<input className="answer" id="answer6" type="text" value={this.state.value} />
            <br/>
            Question 7:<input className="question" id="question7" type="text" value={this.state.value} />
            Answer 7:<input className="answer" id="answer7" type="text" value={this.state.value} />
            <br/>
            Question 8:<input className="question" id="question8" type="text" value={this.state.value} />
            Answer 8:<input className="answer" id="answer8" type="text" value={this.state.value} />
            <br/>
            Question 9:<input className="question" id="question9" type="text" value={this.state.value} />
            Answer 9:<input className="answer" id="answer9" type="text" value={this.state.value} />
            <br/>
            Question 10:<input className="question" id="question10" type="text" value={this.state.value} />
            Answer 10:<input className="answer" id="answer10" type="text" value={this.state.value} />
          </ul>
          <input id="RoundSubmit" type="submit" value="Create Round!" />
        </form>
      </div>
    );
  }
})
