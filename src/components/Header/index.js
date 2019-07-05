import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import estilo from './styles';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.itemsContainer}>
          <Image source={require('../../images/logo_piaui.png')} style={estilo.image} />
          <View style={estilo.textContainer}>
            <Text style={estilo.title}>Cuida Calazar</Text>
          </View>
        </View>
      </View>
    )
  }
}
