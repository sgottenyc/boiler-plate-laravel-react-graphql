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


class FormDialog extends React.Component {
  state = {
    open: false,
    name: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /*
  handleSubmit = (e) => {
   
  };
  */

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={ADD_PRODUCT}>
       {(addProduct, { data }) => {
         return (
          <Formik initialValues={{ name: '', sku: '' , inventory: ''}}
           validate={values => {
            let errors = {};
            if (!values.name) {
              errors.name = 'Required';
            } 
            if (!values.name) {
              sku.name = 'Required';
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            addProduct({ variables: { name: values.name, sku: values.sku, inventory: values.inventory } });
            setSubmitting(false);
            this.handleClose();
            /*
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            */
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
           <div className={classes.main}> 
           <Button color="primary" className={classes.add} variant="contained" onClick={this.handleClickOpen}>
              Add Product
            </Button> 
           <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Add Product</DialogTitle> 
            <DialogContent>    
             <Form>              
              Name: <Field type="name" name="name" /> <br />
              <ErrorMessage name="name" component="div" />
              SKU: <Field type="sku" name="sku" /> <br />
              <ErrorMessage name="sku" component="div" />
              Inventory: <Field type="inventory" name="inventory" /> <br/>
              <ErrorMessage name="inventory" component="div" />            
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
           </Form>
           <DialogActions>
             <Button onClick={this.handleClose} color="primary" variant="contained">
                  Cancel
             </Button>                
           </DialogActions> 
           </DialogContent>
           </Dialog> 
           </div>
          )}
        </Formik>

          /*
          <form id="addProductForm" onSubmit={ e => {
            e.preventDefault();
            debugger;
            addProduct({ variables: { name: "23232"} });            
          }}
          >
          <div className={classes.main}>
            <Button color="primary" className={classes.add} variant="contained" onClick={this.handleClickOpen}>
              Add Product
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
              <DialogContent>            
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="sku"
                  label="SKU"
                  fullWidth
                /> 
                <TextField
                  margin="dense"
                  id="inventory"
                  label="Inventory"
                  fullWidth
                /> 
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" variant="contained">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="secondary" variant="contained">
                    Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          </form>
          */
          )
         }
      }
     </Mutation>
    );
  }
}

/* WRAPPED COMPONENT EXAMPLE 
const WrappedComponent = graphql(GET_ARTICLES, {
  props: ({ data: { loading, error, networkStatus, articles } }) => {
    if (loading) {
      return { loading };
    }

    if (error) {
      return { error };
    }

    return {
      loading: false,
      networkStatus,
      articles,
    };
  },
})(Articles);
*/

export default withStyles(styles)(FormDialog);