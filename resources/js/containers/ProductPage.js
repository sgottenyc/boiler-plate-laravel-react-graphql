import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoginPage from '../containers/LoginPage';
import AppRouter from '../routes/appRouter';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from "../resolvers/productResolver";
import ProductList from "../components/ProductList";

const productTypeDefs = `
  type Product {
    id: Int!
    name: String!
    sku: String!
    inventory: Int
  }
  type Mutation {
    addProduct(name: String!, sku: String, inventory: Int): Product
  }
  type Query {
    products: [Product]
  }
`;

const client = new ApolloClient({
  uri: `/graphql`,
  clientState: {
    defaults,
    resolvers,
    productTypeDefs
  }
});



class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <ProductList />
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));