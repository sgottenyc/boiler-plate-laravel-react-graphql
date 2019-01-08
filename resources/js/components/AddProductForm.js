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
import * as Yup from 'yup';

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
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  clearForm = () => {
    //this.state = { name: '', sku: '', inventory: ''};
  };

  onClickHandler = (e) => {
    let form = this;
    debugger;
  };

  render() {
    const { classes, open, handleClose } = this.props;    
    return (
      <Mutation mutation={ADD_PRODUCT} {...this.props}>
       {(addProduct, { data }) => {
         /* Below does not work because values object not set
            For number, make sure to add strict otherwise not work because 1A evaluate to true
         */
        const ProductSchema = Yup.object().shape({
          name: Yup.string().required('Required'),
          sku: Yup.string().required('Required'),
          inventory: Yup.number()
                         .positive()
                         .integer()
                         .typeError('Inventory must be a positive ${type}.')
        });
         return ( 
              <Formik
              initialValues={{ name:'', sku:'', inventory: '' }} 
              validationSchema={ProductSchema}
              onSubmit={(values, actions) => {
                debugger;
                //event.preventDefault();
                addProduct( { variables: { name: values.name, sku: values.sku, inventory: values.inventory, __typename: 'Product'} } );
                this.props.handleClose();
                return false;
              }}
              >
              { (props) => {
              const change = (name, e) => {
                e.persist();
                props.handleChange(e);
                props.setFieldTouched(name, true, false);
              };
              return (         
              <form ref="myForm" onSubmit={props.handleSubmit}>      
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  required
                  onChange={change.bind(null, "name")}
                  helperText="Please enter the title of your product"
                  label="Name"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="sku"
                  required
                  onChange={change.bind(null, "sku")}
                  label="SKU"
                  fullWidth
                /> 
                <TextField
                  margin="dense"
                  id="inventory" 
                  error={ props.errors.inventory && props.touched.inventory ? true: false}                  
                  onChange={change.bind(null, "inventory")}
                  helperText={props.errors.inventory && props.touched.inventory ? props.errors.inventory : null}
                  label="Inventory"
                  fullWidth
                />
              <DialogActions>                
                <Button onClick={handleClose} color="primary" variant="contained">
                  Cancel
               </Button>
               <Button type="submit" color="secondary" variant="contained">
                  Submit
               </Button>             
              </DialogActions>
           </form> 
              )}}
           </Formik>                 
          )                   
         }
      }
     </Mutation>
    );
  }
}

/* EXAMPLE USING withFormIK HOC. Removed because formIk should be next to form so that mutation function can be passed 
   down and invoke when form completed validation.
   TO DO: Break form into a separate component so that the proper mutation function can be pass down,
          Possibly pass down two mutation, one for update and one for create

const MyEnhancedAddProductForm = withFormik({
  mapPropsToValues: (values, props) => ({ name: '', sku: '', inventory: '' }, props),
  // Custom sync validation
  validate: values => {
    debugger;
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!Number.isInteger(values.inventory)) {
      errors.inventory = 'Inventory must be an integer value';
    }
    return errors;
  },
  handleSubmit: (values, formikBag) => {
    debugger;
    event.preventDefault();
    formikBag.props.addProduct( { variables: { name: this.state.name, 
                                sku: this.state.sku, 
                                inventory: this.state.inventory,
                                __typename: 'Product'} } );
    this.props.handleClose();
    return false;
  },
  displayName: 'BasicForm',
})(AddProductForm);
*/

export default withStyles(styles)(AddProductForm);