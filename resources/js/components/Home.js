import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'

class Home extends Component {
  render () {
    return (
        <div>
          <Dashboard />
        </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('app'))