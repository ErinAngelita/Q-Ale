import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Header, Icon } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';
import '../css/MyQuizzes.css';
import '../css/Images/QALELOGO.png';

export default withAuth(class MyQuizzes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: null,
      ready: false,
      triviasInfo: {},
      trivia: 0,
    }
    this.checkAuthentication = checkAuthentication.bind(this);
    this.displayTrivias = this.displayTrivias.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  populateTrivias = async() => {
    const response = await fetch('/api/myquizzes/' + this.state.userinfo.sub);
    const body = await response.json();
    return body;
  }

  async componentDidMount() {
    await this.checkAuthentication()
    await this.populateTrivias()
    .then((res) => {
      var triviasData = res;
      this.setState({
        triviasInfo: triviasData,
        ready: true,
      })
    })
  }

  async componentDidUpdate() {
    this.checkAuthentication();
    if (this.props.trivia_id !== "") {
      this.props.auth._history.push("/quizreview")
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.updateTriviaId(event.target.name)
  }

  displayTrivias(trivia) {
      let triviasInfo = this.state.triviasInfo
      let listOfTrivias = []
      for (let i = 0; i < triviasInfo.length; i++){
        listOfTrivias.push((<div id="myQuizzes">
          Quiz: {triviasInfo[i].trivias[0].name}
          <br/>
          Date: {triviasInfo[i].trivias[0].date}
          <br/>
          <input id="submitButton" type="submit" name={this.state.triviasInfo[i].trivias[0]._id} value="Review This Quiz" onClick={this.handleClick}/>
          </div>))
      }
        return(
          <div>
          {listOfTrivias}
          </div>)
  }

  render() {
    if (this.state.triviasInfo) {
      return (
        <div>
          <Header id="myQuizzesHeader" as="h1"> My Quizzes </Header>
            {this.displayTrivias(this.state.trivia)}
          <div>
            <img id="logoImg1" src={require("../css/Images/QALELOGO.png")} />
          </div>
        </div>
    )} else {
        return (<div id="loading">Loading Quizzes...</div>)
    }
  }
});
