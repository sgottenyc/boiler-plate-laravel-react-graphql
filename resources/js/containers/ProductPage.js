import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoginPage from '../containers/LoginPage';
import AppRouter from '../routes/appRouter';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from "../resolvers/productResolver";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query GetProducts {
    products @client {
      id
      name
      sku
      inventory
    }
  }
`;


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
  clientState: {
    defaults: {
      isConnected: true,
       products: [ { id: 1, name: 'yahoo', sku: '1a', inventory: 10, __typename: 'Product'}]
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }});
          return null;
        }
      }
    },
    typeDefs: productTypeDefs
  }
});

/*
const client = new ApolloClient({
  uri: `/graphql`,
  clientState: {
    defaults,
    resolvers,
    productTypeDefs
  }
});
*/

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <AddProductForm />
        <Query query={GET_PRODUCTS}>
            {({ data }) => (<ProductList data={data.products} />) }
         </Query>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));