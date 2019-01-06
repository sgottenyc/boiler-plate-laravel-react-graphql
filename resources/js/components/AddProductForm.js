import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import gql from 'graphql-tag';
import { withFormik } from 'formik';


const ADD_PRODUCT = gql`
  mutation addProduct($name: name!, $sku: sku, $inventory: inventory) {
    addProduct(name: $name, sku: $sku, inventory: $inventory) @client {
      id
      name
      sku
      inventory
    }
   }
`;

const styles = theme => ({  
  main: {
    width: '900',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  button: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing.unit,
  },
});


class AddProductForm extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      name: '',
      sku: '',
      inventory: ''
    };
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  clearForm = () => {
    this.state = { name: '', sku: '', inventory: ''};
  };

  render() {
    const { classes, open, handleClose, handleSubmit, isSubmitting } = this.props;
    return (
      <Mutation mutation={ADD_PRODUCT} {...this.props}>
       {(addProduct, { data }) => {
         return (          
              <form onSubmit={ (values, actions) => {
                    event.preventDefault();
                    addProduct( { variables: { name: this.state.name, 
                                               sku: this.state.sku, 
                                               inventory: this.state.inventory,
                                               __typename: 'Product'} } );
                    this.props.handleClose();
                    return false;
               }}>      
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  onChange={this.handleChange('name')}
                  ref={input => { this.nameInput = input;  }}
                  label="Name"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="sku"
                  onChange={this.handleChange('sku')}
                  label="SKU"
                  fullWidth
                /> 
                <TextField
                  margin="dense"
                  id="inventory"
                  onChange={this.handleChange('inventory')}
                  label="Inventory"
                  fullWidth
                /> 
              <DialogActions>                
                <Button onClick={handleClose} color="primary" variant="contained">
                  Cancel
               </Button>
              <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </DialogActions>
           </form>           
          )                   
         }
      }
     </Mutation>
    );
  }
}

const MyEnhancedAddProductForm = withFormik({
  mapPropsToValues: () => ({ name: '', sku: '', inventory: '' }),
  // Custom sync validation
  validate: values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  },
  onSubmit: (values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
  },
  displayName: 'BasicForm',
})(AddProductForm);

export default withStyles(styles)(MyEnhancedAddProductForm);