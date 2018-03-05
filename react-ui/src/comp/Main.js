import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './auth/LoginPage'


const Main = () => (
  <main>
    <Switch>
      <Route path = "/login" component = {LoginPage}/>
    </Switch>
  </main>
)

export default Main;
