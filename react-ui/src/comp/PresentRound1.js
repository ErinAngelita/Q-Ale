import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Accordion } from 'semantic-ui-react';

export default withAuth(class PresentRound1 extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userinfo: null,
      authenticated: null,
      name: " ",
      date: " ",
      quizInfo: {},
    };
    this.checkAuthentication = checkAuthentication.bind( this );
    this.displayRound = this.displayRound.bind(this);
  }

  populateQuiz = async() => {
    const response = await fetch('/api/quizreview/5aaab363f37825434e391a21');
    const body = await response.json();
    return body;
  }

  async componentDidMount() {
    let self = this;
      this.checkAuthentication()
      .then(this.populateQuiz()
      .then((res) => {
        var quizData = res;
         self.setState({
           quizInfo: quizData,
         });
      })
    )
  }

  async componentDidUpdate() {
      this.checkAuthentication();
  }


handleSubmit(event) {
  var questionNum;
  event.preventDefault()
  questionNum = questionNum++;
  return questionNum;
}

  displayRound(round) {
      let quizInfo = this.state.quizInfo
      let questions1Present = []
      for (let i = 1; i <= 10; i++){
        questions1Present.push((<div>
          Question {i}: {quizInfo.rounds[round].questions[0]["question"+i]}
          <br/>
          </div>))
      }
      //within the divs are where we will make changes to all the question and answer display/style/etc.
        return(
          <div>
          {quizInfo.rounds[round].category}
          {questions1Present}
          </div>)
      }
      //within these divs is where we make changes to display/style/etc. for everything else


displayQuestion(questionNum) {
  var showQuest = "";
    switch(questionNum) {
      case 0:
          showQuest= "presenting round 1"
          return showQuest;
          break;
      case 1:
          showQuest = "Question 1: "
          break;
      case 2:
        showQuest = "Question 2: "
      }
}

  render() {
    if (this.state.quizInfo.name) {
    return(
    <form onSubmit = {this.handleSubmit}>
          <div>
          Presentation Round 1!
          <br/>
          {this.state.quizInfo.name}
          <br/>
          {this.state.quizInfo.date}
          <br/>
          {this.displayQuestion(this.questionNum)}
          <br/>
          {this.displayRound(0)}
          <br/>
          <input type="submit" value="Next Question" />
          </div>
    </form>
      )} else {
        return (<div>Loading...</div>)
      }
    }
  })
