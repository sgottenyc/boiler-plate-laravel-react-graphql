import React from 'react';
import { Mutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import gql from 'graphql-tag';
import PropTypes from 'react';

const DELETE_PRODUCTS = gql`
  mutation deleteProducts($id: [Int!]!) {
    deleteProducts(id: $id) @client {
      id
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
  selected: PropTypes.object.isRequired,
  onSuccessDeletion: PropTypes.object.isRequired
};


export default EnhancedDeleteButton;