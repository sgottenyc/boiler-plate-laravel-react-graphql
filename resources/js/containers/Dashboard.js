import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './../components/Dashboard'

class DashboardPage extends Component {
  render () {
    return (
        <div>
          <Dashboard />
        </div>
    )
  }
}

ReactDOM.render(<DashboardPage />, document.getElementById('app'))