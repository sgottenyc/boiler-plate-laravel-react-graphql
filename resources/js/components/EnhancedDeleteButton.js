import React from 'react';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)  {
      id
      sku
    }
   }
`;

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


class EnhancedDeleteButton extends React.Component {
  constructor(props) {
    super(props);    
  }
  render() {
    const {selected, onSuccessDeletion } = this.props;
    return (
      <Mutation
        mutation={DELETE_PRODUCT}
        update={ (cache, { data: { deleteProduct } } ) => {        
          //console.log(deleteProduct);
          const previous =  cache.readQuery({ query: GET_PRODUCTS });
          //console.log(previous);
          let currentProductIndex = previous.products.findIndex(x => x.id == deleteProduct.id);
          if(currentProductIndex >= 0) {
            previous.products.splice(currentProductIndex, 1);
           }         
          cache.writeQuery({ 
              query:GET_PRODUCTS,
              data: { products: previous.products }
          });
          return previous.products;
        }}    
      >
        {deleteProduct => (          
          <Tooltip title="Delete Selected">
            <IconButton aria-label="Delete" 
            onClick={() => {
            deleteProduct({ variables: { id: selected[0] } });            
            onSuccessDeletion();
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Mutation>
    );
  }
}

EnhancedDeleteButton.propTypes = {
  selected: PropTypes.array,
  onSuccessDeletion: PropTypes.func
};


export default EnhancedDeleteButton;