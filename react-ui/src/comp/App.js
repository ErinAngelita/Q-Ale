import React, { Component } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import LoginPage from './auth/LoginPage.js';
import TestRoute from './TestRoute.js'

const App = () => (
  <div>
    <TestRoute />
    <Header />
    <Main />
    <LoginPage />
  </div>
);

export default App;
