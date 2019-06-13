import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <View>
        <Text>Felipe</Text>
      </View>
    );
  }
}