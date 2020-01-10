import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CasoReducer from './CasoReducer';
import EntrarNavigator from './src/pages/EntrarNavigator'

const store = createStore(CasoReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EntrarNavigator />
      </Provider>
    )
  }
}