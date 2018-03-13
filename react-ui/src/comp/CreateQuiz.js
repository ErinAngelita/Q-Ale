import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';

export default withAuth(class CreateQuiz extends Component {
  constructor(props){
    super(props);
    this.state = {text: "", userinfo: null, authenticated: null, trivia_id: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
      this.checkAuthentication();
  }

  async componentDidUpdate() {
      this.checkAuthentication();
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({text: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/userId', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenSub: this.state.userinfo.sub,
        name: document.getElementById("quizname").value,
        date: document.getElementById("date").value,
        round: [{
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
        }]
      })
    })
    console.log(document.getElementById("quizname").value);
    this.setState({trivia_id: document.getElementById("quizname").value});
  }
  render(){
    return(
      <div>
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
