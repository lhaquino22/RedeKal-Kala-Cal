import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View>
        <Header />
      </View>
    )
  }
}