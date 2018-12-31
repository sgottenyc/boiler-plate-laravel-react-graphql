import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Registration from './../components/Registration'

class RegisterPage extends Component {
  render () {
    return (
        <div>
          <Registration />
        </div>
    )
  }
}

export default RegisterPage;

ReactDOM.render(<RegisterPage />, document.getElementById('app'));