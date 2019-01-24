import React from 'react';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const DELETE_PRODUCTS = gql`
  mutation deleteProducts($id: [ID]!) {
    deleteProducts(id: $id)  {
      id
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
        mutation={DELETE_PRODUCTS}
        update={ (cache, { data: { deleteProducts } } ) => {        
          //console.log(deleteProduct);
          const previous =  cache.readQuery({ query: GET_PRODUCTS });
          //console.log(previous);
          //debugger;  // eslint-disable-line
          for (let y=0; y < deleteProducts.length; y++) 
           {
              let currentProductIndex = previous.products.findIndex(x => x.id == deleteProducts[y].id);
              if(currentProductIndex >= 0) {
                previous.products.splice(currentProductIndex, 1);
              }
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
            deleteProduct({ variables: { id: selected } });            
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