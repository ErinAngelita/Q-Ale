import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';
import { Container, Header } from 'semantic-ui-react';

export default withAuth(class QuizReview extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      userinfo: null,
      authenticated: null,
      name: " ",
      date: " ",
      quizInfo: "",
    };
    this.checkAuthentication = checkAuthentication.bind( this );
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

  // showQuiz(event) => {
  //   event.preventDefault();
  //     fetch( '/api/textroundinput/' + this.props.trivia_id, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then(results => {
  //       return results.json();
  //       console.log(results);
  //     })
  // }


  render() {
    console.log(this.state.quizInfo.name)
    return(
      <div>
        <p>
          Quiz Review
        </p>
        <Container text>
        <p>
        </p>
        </Container>
      </div>
    )
  }
})
