import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';

const AppRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </div>
  </Router>
);

export default AppRouter;