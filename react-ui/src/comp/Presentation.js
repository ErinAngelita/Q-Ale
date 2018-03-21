import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Accordion } from 'semantic-ui-react';
import '../css/Presentation.css';
import QAleLogo from '../css/Images/QAleLogoButton.png';
import '../css/Images/QALELOGO.png';

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
    const response = await fetch('/api/quizreview/' + this.props.trivia_id);
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
        roundNum: 0,
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
    let showQuestion = "";
    let showAnswers = "";
    let questionNum = this.state.questionNum
    switch(questionNum) {
      default:
          showQuestion = "Loading questions..."
          break;
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
          showQuestion = "Turn in your answer sheets!"
          break;
      case 11:
          let answers = []
          for (let i = 1; i <= 10; i++){
            answers.push((<div>
              Answer {i}: {quizInfo.rounds[roundNum].questions[0]["answer"+i]}
              </div>))
            }
          showAnswers = answers
      }
    return(
      <div>
        <div id="roundCat3">{quizInfo.rounds[roundNum].category}</div>
        <br/>
        <div id="presentQuestion">{showQuestion}</div>
        <div id="presentAnswers">{showAnswers}</div>
      </div>);
  }

  render() {
    if (this.state.quizInfo.name) {
      return(
      <form id="presentationForm" onSubmit = {this.handleSubmit}>
        <div>
          {this.displayQuestions(this.state.roundNum)}
          <br/>
          <input id="submitButton" type="submit" value="Next" />
          <div>
            <img id="logoImg2" src={require("../css/Images/QALELOGO.png")} />
          </div>
        </div>
      </form>
      )
    } else {
      return (<div id="loading">Loading...</div>)
    }
  }
})


// Created QAleLogoButton.png in Images folder and imported it here
// tried many things to make QAleLogo display/work as button.  Can get it to display, but not funtion.
// Tried the following, rather than <input> tag with many variations.
// 134  <img id="hikebutton" src={QAleLogo} type="submit"/>
// Also tried the <input> tag with many variations.
