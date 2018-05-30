import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Scanner from './src/container/Scanner'
import configureStore from './src/redux/store'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Scanner />
      </Provider>
    )
  }
}
