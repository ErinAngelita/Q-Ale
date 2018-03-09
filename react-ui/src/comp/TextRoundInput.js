import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { checkAuthentication } from './helpers';
import CreateQuiz from './CreateQuiz.js';

export default withAuth(class TextRoundInput extends Component {
  constructor(props){
    super(props);
    this.state = {text: "", userinfo: null, authenticated: null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
      this.checkAuthentication();
  }

  async componentDidUpdate() {
      this.checkAuthentication();
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/textroundinput/:trivia_id', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trivia_id: this.props.trivia_id,
        category: document.getElementById("roundcategory").value,
        question: document.getElementById("question1").value,
        answer: document.getElementById("answer1").value,
        question: document.getElementById("question2").value,
        answer: document.getElementById("answer2").value,
        question: document.getElementById("question3").value,
        answer: document.getElementById("answer3").value,
        question: document.getElementById("question4").value,
        answer: document.getElementById("answer4").value,
        question: document.getElementById("question5").value,
        answer: document.getElementById("answer5").value,
        question: document.getElementById("question6").value,
        answer: document.getElementById("answer6").value,
        question: document.getElementById("question7").value,
        answer: document.getElementById("answer7").value,
        question: document.getElementById("question8").value,
        answer: document.getElementById("answer8").value,
        question: document.getElementById("question9").value,
        answer: document.getElementById("answer9").value,
        question: document.getElementById("question10").value,
        answer: document.getElementById("answer10").value,

      })
    })
  }
  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
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
        <input type="submit" value="Create Quiz!" />
      </form>
    );
  }
})
