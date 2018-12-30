import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

ReactDOM.render(<Registration />, document.getElementById('app'))