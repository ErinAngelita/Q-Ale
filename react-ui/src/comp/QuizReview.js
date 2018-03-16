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
      quizInfo: {
       },
    };
    this.checkAuthentication = checkAuthentication.bind( this );
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

  displayRound1() {
    if (this.state.quizInfo.name) {
      return (
          <div>
            {this.state.quizInfo.rounds[0].category}
          <br/>
          <Accordion>
     {this.state.quizInfo.rounds[0].questions[0].question1}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer1}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question2}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer2}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question3}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer3}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question4}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer4}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question5}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer5}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question6}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer6}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question7}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer7}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question8}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer8}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question9}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer9}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].question10}
     <br/>
     {this.state.quizInfo.rounds[0].questions[0].answer10}
     <br/>
     </Accordion>
     </div>
   )
  } else {
    return(<div/>)
 }
}

displayRound2() {
  if (this.state.quizInfo.name) {
  return (<div>
    {this.state.quizInfo.rounds[1].category}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question1}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer1}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question2}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer2}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question3}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer3}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question4}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer4}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question5}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer5}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question6}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer6}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question7}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer7}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question8}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer8}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question9}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer9}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].question10}
    <br/>
    {this.state.quizInfo.rounds[1].questions[0].answer10}
    <br/>
  </div>)
} else{
  return(<div/>)
}
}

displayRound3() {
  if (this.state.quizInfo.name) {
  return (<div>
    {this.state.quizInfo.rounds[2].category}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question1}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer1}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question2}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer2}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question3}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer3}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question4}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer4}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question5}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer5}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question6}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer6}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question7}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer7}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question8}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer8}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question9}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer9}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].question10}
    <br/>
    {this.state.quizInfo.rounds[2].questions[0].answer10}
    <br/>
  </div>)
} else{
  return(<div/>)
}
}

displayRound4() {
  if (this.state.quizInfo.name) {
  return (<div>
    {this.state.quizInfo.rounds[3].category}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question1}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer1}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question2}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer2}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question3}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer3}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question4}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer4}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question5}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer5}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question6}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer6}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question7}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer7}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question8}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer8}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question9}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer9}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].question10}
    <br/>
    {this.state.quizInfo.rounds[3].questions[0].answer10}
    <br/>
  </div>)
} else{
  return(<div/>)
}
}

displayRound5() {
  if (this.state.quizInfo.name) {
  return (<div>
    {this.state.quizInfo.rounds[4].category}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question1}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer1}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question2}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer2}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question3}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer3}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question4}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer4}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question5}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer5}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question6}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer6}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question7}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer7}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question8}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer8}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question9}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer9}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].question10}
    <br/>
    {this.state.quizInfo.rounds[4].questions[0].answer10}
    <br/>
  </div>)
} else{
  return(<div/>)
}
}

  render() {
    // let roundsToRender = <p>Loading Rounds</p>;
    // let questionsToRender = <p>Loading Questions</p>;
    // if (this.state.quizInfo.name) {
    //   roundsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.category}</p> )} </div>
    //   questionsToRender = <div> {this.state.quizInfo.rounds.map((rounds) => <p>{rounds.questions.map((questions)=> <p>{questions.question1}</p>)}</p> )} </div>
    // };
    return(
      <div>
      {this.state.quizInfo.name}
      <br/>
      {this.state.quizInfo.date}
      <br/>
      {this.displayRound1()}
      <br/>
      {this.displayRound2()}
      <br/>
      {this.displayRound3()}
      <br/>
      {this.displayRound4()}
      <br/>
      {this.displayRound5()}
      </div>
    )
  }
})
