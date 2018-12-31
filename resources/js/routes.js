import React from 'react';
import App from './components/App';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import { BrowserRouter, Route } from 'react-router-dom'

export default (
  <Route path="/" component={App}>
    <Route path="/register" component={RegisterPage} />    
    <Route path="/login" component={LoginPage} />    
  </Route>
);