import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Root from './Root';
import ApolloClient from "apollo-boost";
import LoginPage from '../containers/LoginPage';

const client = new ApolloClient({
    uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
  });
  


// Configure default store ..temp remove for now
//const store = configureStore({},client);

class App extends Component {
  render () {
    return (
      <LoginPage />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));