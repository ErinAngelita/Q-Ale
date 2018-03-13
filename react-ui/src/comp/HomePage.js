import React from 'react';
import Auth from '../modules/Auth';


export default class HomePage extends React.Component {

  componentDidMount() {
    this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
      <div className="container">
        <h2>React Application</h2>
        <h3>This is the home page.</h3>
        {Auth.isUserAuthenticated() ? (
          <p style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</p>
        ) : (
          <p style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</p>
        )}
      </div>
    );
  }
}
