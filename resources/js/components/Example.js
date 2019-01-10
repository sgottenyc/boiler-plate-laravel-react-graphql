import React from 'react';
import PropTypes from 'prop-types';

/*
 *  JSX Below will create this component
 *  <Example name="" description="" />
 */

export default class Example extends React.Component {
    constructor(props) {
      super(props);            
      this.onClick = this.onClick.bind(this);  //bind the function to this object
      this.state = { timesClicked: 0 };
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
                                { description }                                 
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
    name: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired
};