import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from '../routes/appRouter';
import { ApolloProvider } from 'react-apollo';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }});
          return null;
        }
      }
    }
  }
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