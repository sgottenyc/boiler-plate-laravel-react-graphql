import React from 'react';
import PropTypes from 'prop-types';
/*
 *  JSX Below will create this component
 *  <Example title="" initialCount="0"/>
 */

export default class Example extends React.Component {
    constructor(props) {
      super(props);            
      this.onClick = this.onClick.bind(this);  //bind the function to this object
      this.state = { timesClicked: props.initialCount }  //set initial count
    }
    onClick() {
        this.setState( { timesClicked: this.state.timesClicked + 1 });
        alert('i clicked');
    }    
    render() {
        const { name, description } = this.props;       // destructure props object to local variable for use in jsx render function
        const { timesClicked } = this.state;            // destructure state object to local variable for use in jsx render function
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{name}</div>
                            <div className="card-body" onClick={this.onClick}>                                                     
                                Number of times clicked {timesClicked}.
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*** USE PROP TYPES TO DEFINE DEFAULTS */
Example.propTypes = {
    name: PropTypes.string.isRequired,
    initialCount: PropTypes.number
};

/** SET DEFAULT STARTING VALUES */
Example.defaultProps = {
    initialCount: 0
};