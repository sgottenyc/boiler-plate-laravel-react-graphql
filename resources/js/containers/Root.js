import React, { Component } from 'react';
import PropTypes from 'prop-types';
import routes from '../routes';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Router } from 'react-router-dom'

export default class Root extends Component {
  render() {
    const { store, client } = this.props;
    return (
      <BrowserRouter>
        <ApolloProvider store={store} client={client}>
        <Route path="/" component={App}>
          <Route path="/register" component={RegisterPage} />    
          <Route path="/login" component={LoginPage} />    
        </Route>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

/* Remove for now
Root.propTypes = {
  store: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};
*/