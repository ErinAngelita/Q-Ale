import React, { Component } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import LoginPage from './auth/LoginPage.js';

const App = () => (
  <div>
    <Header />
    <Main />
    <LoginPage />
  </div>
);

export default App;
