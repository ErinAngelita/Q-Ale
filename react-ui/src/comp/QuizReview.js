import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header, Accordion } from 'semantic-ui-react';

export default withAuth(class QuizReview extends Component {
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
    this.handleSubmit = this.handleSubmit.bind( this );

  }
  // handleClick(e, titleProps) => {
  //   const {index} = titleProps
  //
  // }

  populateQuiz = async() => {
    // 5aaab363f37825434e391a21 hard coded trivia_id for testing, local to Kelsey's Macbook
    //needs to be + this.props.trivia_id if not hardcoded
    const response = await fetch('/api/quizreview/5aaf312d48ccbe0004631dea');
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

  displayRound(round) {
      let quizInfo = this.state.quizInfo
      let questionsAndAnswers = []
      for (let i = 1; i <= 10; i++){
        questionsAndAnswers.push((<div>
          Question {i}: {quizInfo.rounds[round].questions[0]["question"+i]}
          <br/>
          Answer {i}: {quizInfo.rounds[round].questions[0]["answer"+i]}
          </div>))
      }
      //within the divs are where we will make changes to all the question and answer display/style/etc.
        return(
          <div>
          {quizInfo.rounds[round].category}
          {questionsAndAnswers}
          </div>)
  }
      //within these divs is where we make changes to display/style/etc. for everything else
  handleSubmit(event) {
    event.preventDefault();
    this.props.auth._history.push("/presentation")
  }

  render() {
    // let roundsToRender = <p>Loading Rounds</p>;
    // let questionsToRender = <p>Loading Questions</p>;
    // if (this.state.quizInfo.name) {
    //   roundsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.category}</p> )} </div>
    //   questionsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.questions.map((questions)=> <p>{questions.question1}</p>)}</p> )} </div>
    // };
    if (this.state.quizInfo.name) {
      return(
        <form onSubmit = {this.handleSubmit}>
          <div>
          {this.state.quizInfo.name}
          <br/>
          {this.state.quizInfo.date}
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
          <input type="submit" value="Present Quiz!" />
          </div>
        </form>
      )} else {
        return (<div>Loading...</div>)
      }
    }
  })
