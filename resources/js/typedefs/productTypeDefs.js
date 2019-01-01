export default productTypeDefs = `
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