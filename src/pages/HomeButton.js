import React, { Component } from 'react';
import { View, Image } from "react-native";

export default class HomeButton extends Component {
  render() {
    return (
      <View>
        <Image source={require('../../assets/images/home.png')}
          style={{ width: 55, height: 55, resizeMode: 'contain' }} />
      </View>
    );
  }
}