import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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

let nextProductId = 7;

const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true,
       products: []
    },
    resolvers: {
      Mutation: {
        // send the object to cache
        addProduct: (_, { name, sku, inventory }, { cache }) => {
          const query = gql`
                              query GetProducts {
                                products @client {
                                  id
                                  name
                                  sku
                                  inventory
                                }
                              }
                            `;
            //Get the data and save it to previous
            debugger;
            const previous = cache.readQuery({ query });
            const newProduct = { id: nextProductId++, name, sku, inventory, __typename: 'Product' };
            const data = {
              products: previous.products.concat([newProduct]),
            };            
            cache.writeQuery({ 
              query:query,
              data: data
            });
            return newProduct;
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