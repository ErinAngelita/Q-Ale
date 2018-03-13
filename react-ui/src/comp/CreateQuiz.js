import React, { Component } from 'react';

export default class CreateQuiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      meow: "meow"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTid(e, id) {
    e.preventDefault();
    this.props.updateTriviaId(id);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/createquiz', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenSub: this.state.userinfo.sub,
        name: document.getElementById("quizname").value,
        date: document.getElementById("date").value
      })
    }).then((response) => {
      return response;
    }).then((response) => {
      const meow = response.json();

    });
  }

  render(){
    return(
      <div>
        <p>{this.props.trivia_id}</p>
        <button onClick={(e) => this.updateTid(e, "meh")}>hello</button>
        <form onSubmit = {this.handleSubmit}>
          <label> Quizname:
            <input id="quizname" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label> Date:
            <input id="date" type="date" />
          </label>
          <input type="submit" value="Create Quiz!" />
        </form>
      </div>
    );
  }
}
