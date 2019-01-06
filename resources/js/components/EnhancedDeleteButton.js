import React from 'react';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';


const DELETE_PRODUCTS = gql`
  mutation deleteProducts($id: [Int!]!) {
    deleteProducts(id: $id) @client {
      id
    }
   }
`;

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

class EnhancedDeleteButton extends React.Component {
  constructor(props) {
    super(props);    
  };  
  render() {
    const {selected, onSuccessDeletion } = this.props;
    return (
      <Mutation
        mutation={DELETE_PRODUCTS}
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
};
 
}

export default EnhancedDeleteButton;