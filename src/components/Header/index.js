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
            <Text style={estilo.title}>Cuida Calasar</Text>
            <Text style={estilo.subTitle}>Secretaria de Saúde do Piauí</Text>
          </View>
        </View>
      </View>
    )
  }
}
