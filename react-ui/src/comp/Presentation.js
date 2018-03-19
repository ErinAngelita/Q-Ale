import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Accordion } from 'semantic-ui-react';

export default withAuth(class Presentation extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userinfo: null,
      authenticated: null,
      name: " ",
      date: " ",
      quizInfo: {},
      questionNum: 0,
      roundNum: 0,
    };
    this.checkAuthentication = checkAuthentication.bind( this );
    this.displayQuestions = this.displayQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  populateQuiz = async() => {
    // 5aaab363f37825434e391a21 hard coded trivia_id for testing, local to Kelsey's Macbook
    //needs to be + this.props.trivia_id if not hardcoded
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
    event.preventDefault()
    this.setState({
      questionNum: this.state.questionNum+1,
    })
    if (this.state.roundNum === 4 && this.state.questionNum === 11) {
      this.setState({
        questionNum: 0,
        roundNum: 0
      })
      this.props.auth._history.push("/myquizzes")
    } else if (this.state.questionNum === 11) {
      this.setState({
        questionNum: 0,
        roundNum: this.state.roundNum+1
      })
    }
  }

  displayQuestions(roundNum) {
    let quizInfo = this.state.quizInfo
    let questions1Present = ""
    let showQuestion = "";
    let questionNum = this.state.questionNum
    switch(questionNum) {
      case 0:
          showQuestion = "Question 1: " + quizInfo.rounds[roundNum].questions[0]["question1"]
          break;
      case 1:
          showQuestion = "Question 2: " + quizInfo.rounds[roundNum].questions[0]["question2"]
          break;
      case 2:
          showQuestion = "Question 3: " + quizInfo.rounds[roundNum].questions[0]["question3"]
          break;
      case 3:
          showQuestion= "Question 4: " + quizInfo.rounds[roundNum].questions[0]["question4"]
          break;
      case 4:
          showQuestion = "Question 5: " + quizInfo.rounds[roundNum].questions[0]["question5"]
          break;
      case 5:
          showQuestion = "Question 6: " + quizInfo.rounds[roundNum].questions[0]["question6"]
          break;
      case 6:
          showQuestion = "Question 7: " + quizInfo.rounds[roundNum].questions[0]["question7"]
          break;
      case 7:
          showQuestion = "Question 8: " + quizInfo.rounds[roundNum].questions[0]["question8"]
          break;
      case 8:
          showQuestion = "Question 9: " + quizInfo.rounds[roundNum].questions[0]["question9"]
          break;
      case 9:
          showQuestion = "Question 10: " + quizInfo.rounds[roundNum].questions[0]["question10"]
          break;
      case 10:
          showQuestion = "Intermission"
          break;
      case 11:
          let answers = []
          for (let i = 1; i <= 10; i++){
            answers.push((<div>
              Answer {i}: {quizInfo.rounds[roundNum].questions[0]["answer"+i]}
              </div>))
            }
          showQuestion = answers
      }
    return(
      <div>
        {quizInfo.rounds[roundNum].category}
        <br/>
        {showQuestion}
      </div>);
  }

  render() {
    if (this.state.quizInfo.name) {
      return(
      <form onSubmit = {this.handleSubmit}>
        <div>
          {this.state.quizInfo.name}
          <br/>
          {this.state.quizInfo.date}
          <br/>
          {this.displayQuestions(this.state.roundNum)}
          <br/>
          <input type="submit" value="Next" />
        </div>
      </form>
      )
    } else {
      return (<div>Loading...</div>)
    }
  }
})
