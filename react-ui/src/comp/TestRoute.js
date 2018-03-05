import React, {Component} from 'react';

export default class ReturnField extends Component {
  constructor(props){
    super(props);
    this.state = {text: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({text: event.target.value});
  }
  handleSubmit(event) {
    console.log(this.state.text);
    event.preventDefault();
    fetch('/api/question', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: 'a question',
      })
    });
  }
  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
        <label>quizname:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        </label>
      </form>
    );
  }
}
