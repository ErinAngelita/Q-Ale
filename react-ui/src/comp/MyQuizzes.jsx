import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Header, Icon, Table, Button } from 'semantic-ui-react';

import { checkAuthentication } from './helpers';

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
    console.log(this.props);
  }

  async componentDidUpdate() {
    this.checkAuthentication();
    if (this.props.trivia_id !== "") {
      this.props.auth._history.push("/quizreview")
    }
    console.log(this.props.trivia_id)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.updateTriviaId(event.target.value)
    //console.log(event.target.value)
  }

  displayTrivias(trivia) {
      let triviasInfo = this.state.triviasInfo
      let listOfTrivias = []
      console.log(triviasInfo);
      for (let i = 0; i < triviasInfo.length; i++){
        listOfTrivias.push((<div >
          Quiz: {triviasInfo[i].trivias[0].name}
          <br/>
          Date: {triviasInfo[i].trivias[0].date}
          <br/>
          <input type="submit" value={this.state.triviasInfo[i].trivias[0]._id} onClick={this.handleClick}/>
          </div>))
      }
      //within the divs are where we will make changes to all the question and answer display/style/etc.
        return(
          <div>
          {listOfTrivias}
          </div>)
  }

  // async applyClaims() {
  //   if (this.state.userinfo && !this.state.claims) {
  //     const claims = Object.entries(this.state.userinfo);
  //     this.setState({ claims, ready: true });
  //   }
  // }

  render() {
    if (this.state.triviasInfo) {
      return (
        <div>
          <Header as="h1"><Icon name="drivers license outline" /> My Quizzes </Header>
            {this.displayTrivias(this.state.trivia)}
          <Table>
            <thead>
              <tr>
                <th>Quiz</th><th>Date</th><th>Review</th>
              </tr>
            </thead>
            <tbody>

              <br/>
            </tbody>
          </Table>
        </div>
    )} else {
        return (<div>Loading Quizzes...</div>)
    }
  }
});

// this goes at 69.5
// {this.state.claims.map((claimEntry) => {
//   const claimName = claimEntry[0];
//   const claimValue = claimEntry[1];
//   const claimId = `claim-${claimName}`;
//   return <tr key={claimName}><td>{claimName}</td><td id={claimId}>{claimValue}</td></tr>;
// })}
