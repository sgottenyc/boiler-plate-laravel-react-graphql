import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import ProductList from "../components/ProductList";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sku
      inventory
    }
  }
`;


/*For use with client storage
const productTypeDefs = `
  type Product {
    id: Int!
    name: String!
    sku: String!
    inventory: Int
  }
  type Mutation {
    addProduct(name: String!, sku: String, inventory: Int): Product
    updateProduct(id: Int!, name: String!, sku: String, inventory: Int): Product
    deleteProducts(id: [Int!]!) : Product
  }
  type Query {
    products: [Product]
  }
`;
*/

//let nextProductId = 7;

/* TEST
mutation update {
  updateProduct(id:1, name:"223", sku:"1232",inventory: 12) @client {
    id
    name
    sku
    inventory
  }
}
*/

/* USING CLIENT STATE 
const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true,
      products: []
    },
    resolvers: {
      Mutation: {
         deleteProducts: (_, { id }, { cache }) => {
          const query = gql`
                              query GetProducts {
                                products  {
                                  id
                                  name
                                  sku
                                  inventory
                                }
                              }
                            `;
           
           for (let y=0; y < id.length; y++) 
           {
              let currentProductIndex = previous.products.findIndex(x => x.id === id[y]);
              if(currentProductIndex >= 0) {
                previous.products.splice(currentProductIndex, 1);
              }
           }            
            const data = {
              products: previous.products
            };            
            cache.writeQuery({ 
              query:query,
              data: data
            });
            return previous.products;
        },
        updateProduct: (_, { id, name, sku, inventory }, { cache }) => {
            const query = gql`
                              query GetProducts {
                                products {
                                  id
                                  name
                                  sku
                                  inventory
                                }
                              }
                            `;
            //Get the data and save it to previous
            //debugger;
            const previous = cache.readQuery({ query });
            const currentProduct = { id, name, sku, inventory, __typename: "Product" };
            const currentProductIndex = previous.products.findIndex(x => x.id === id); 
            previous.products[currentProductIndex] = currentProduct;
            const data = {
              products: previous.products
            };            
            cache.writeQuery({ 
              query:query,
              data: data
            });
            return currentProduct;
        },
        // send the object to cache
        addProduct: (_, { name, sku, inventory }, { cache }) => {
            const query = gql`
                              query GetProducts {
                                products  {
                                  id
                                  name
                                  sku
                                  inventory
                                }
                              }
                            `;
            //Get the data and save it to previous
            //debugger;
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
*/

const client = new ApolloClient({
  uri: `/graphql`
});

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>        
        <Query query={GET_PRODUCTS}>
            {({ data }) => (<ProductList data={data.products} />) }
         </Query>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));