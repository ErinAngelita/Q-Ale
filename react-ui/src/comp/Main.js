import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ApiTest from './ApiTest'
import BearTest from './BearTest'
import LoginPage from './auth/LoginPage'

const Main = () => (
  <main>
    <Switch>
      <Route path = "/login" component = {LoginPage}/>
      <Route exact path='/' component={ApiTest}/>
      <Route exact path='/bears' component={BearTest}/>
    </Switch>
  </main>
)

export default Main;
