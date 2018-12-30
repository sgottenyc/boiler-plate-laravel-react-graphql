import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Checkout from './../components/Checkout'

class CheckoutPage extends Component {
  render () {
    return (
        <div>
          <Checkout />
        </div>
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'))