import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from "apollo-boost";
import LoginPage from '../containers/LoginPage';
import { ApolloProvider } from "react-apollo";
import AppRouter from '../routes/appRouter';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import appReducer from '../reducers/appReducer';

const client = new ApolloClient({
    uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
  }); 

const store = createStore(
    combineReducers({
      app: appReducer
    }),
    {}, // initial state
);
  
class App extends Component {
  render () {
    return (
      <ApolloProvider client={client} store={store}>
        <AppRouter/>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));