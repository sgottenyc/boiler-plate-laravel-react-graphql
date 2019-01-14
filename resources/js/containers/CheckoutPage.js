import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Checkout from './../components/Checkout'

export default class CheckoutPage extends Component {
  render () {
    return (
      <Checkout />
    )
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'))