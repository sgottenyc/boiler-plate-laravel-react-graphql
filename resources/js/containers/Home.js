import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './../components/Dashboard'

class Home extends Component {
  render () {
    return (
          <Dashboard />
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('app'))