import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

export default class GeorrefScreen extends Component {
  render() {
    return (
      <View>
        <MapView style={{flex:1}}/>
      </View>
    )
  }
}