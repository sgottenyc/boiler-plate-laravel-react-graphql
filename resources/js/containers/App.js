import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from "apollo-boost";
import LoginPage from '../containers/LoginPage';
import { ApolloProvider } from "react-apollo";
import AppRouter from '../routes/appRouter';

const client = new ApolloClient({
    uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
  });
  
class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <AppRouter/>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));