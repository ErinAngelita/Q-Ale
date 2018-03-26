import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Icon, Accordion } from 'semantic-ui-react';
import '../css/QuizReview.css';
import logo from '../css/Images/QALELOGO.png';
import QAleLogo from '../css/Images/QAleLogoButton.png';

export default withAuth(class QuizReview extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userinfo: null,
      authenticated: null,
      name: " ",
      date: " ",
      quizInfo: {},
      activeIndex: -1,
    };
    this.checkAuthentication = checkAuthentication.bind( this );
    this.displayRound = this.displayRound.bind(this);
    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleClick = this.handleClick.bind(this);
  }

  populateQuiz = async() => {
    const response = await fetch('/api/quizreview/' + this.props.trivia_id);
    const body = await response.json();
    return body;
  }

  async componentDidMount() {
    await this.checkAuthentication()
    await this.populateQuiz()
    .then((res) => {
      var quizData = res;
       this.setState({
         quizInfo: quizData,
       });
    })
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  displayRound(round) {
    let quizInfo = this.state.quizInfo
    let questionsAndAnswers = []
    const {activeIndex} = this.state
    for (let i = 1; i <= 10; i++) {
      questionsAndAnswers.push((
        <div>
          Question {i}: {quizInfo.rounds[round].questions[0]["question"+i]}
          <br/>
          Answer {i}: {quizInfo.rounds[round].questions[0]["answer"+i]}
        </div>
      ))
    }
      return(
        <div>
          <Accordion>
            <Accordion.Title id="roundCat2" active={activeIndex === round} index={round} onClick={this.handleClick}>
              <div>
                <Icon as="img" id="beerGlassIcon" src={QAleLogo} />
                <Icon name="dropdown" />
                Round Category: {quizInfo.rounds[round].category}
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === round}>
              {questionsAndAnswers}
            </Accordion.Content>
          </Accordion>
        </div>
      )
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.auth._history.push("/presentation")
  }

  handleClick(event, titleProps) {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({activeIndex: newIndex})
  }

  render() {
    if (this.state.quizInfo.name) {
      return(
        <form id="ReviewForm" onSubmit = {this.handleSubmit}>
          <div>
            <div id="quizName2">{this.state.quizInfo.name}</div>
            <br/>
            <div id="date2">{this.state.quizInfo.date}</div>
            <br/>
            {this.displayRound(0)}
            <br/>
            {this.displayRound(1)}
            <br/>
            {this.displayRound(2)}
            <br/>
            {this.displayRound(3)}
            <br/>
            {this.displayRound(4)}
            <br/>
            <input id="submitButton" type="submit" value="Present Quiz!" />
            <div>
              <img id="logoImg3" src={logo} />
            </div>
          </div>
        </form>
      )} else {
        return (
          <div id="loading">Loading...</div>
        )
      }
    }
  })
