import React from 'react';
import PropTypes from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import AddProductForm from '../components/AddProductForm';

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


class AddProductDialog extends React.Component {
  constructor(props) {
    super(props);    
  }  
  render() {
    const { classes, handleClose } = this.props;
    return (
         <div className={classes.main}>           
           <Dialog
              open={this.props.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Product</DialogTitle> 
              <DialogContent> 
              <AddProductForm handleClose={handleClose} />
            </DialogContent>
           </Dialog> 
        </div>
    );
  }
}


AddProductDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  handleClose: PropTypes.object.isRequired,
};


export default withStyles(styles)(AddProductDialog);