import React, {Component} from 'react';
import MainNavigator from './src/pages/MainNavigator';
import EntrarNavigator from './src/pages/EntrarNavigator'

export default class App extends Component {
  render() {
    return (
      <EntrarNavigator />
    )
  }
}