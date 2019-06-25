import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import estilo from './styles';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={estilo.headerContainer}>
        <View style={estilo.headerItemsContainer}>
          <Image source={require('../../images/logo_piaui.png')} style={estilo.headerImage} />
          <View style={estilo.headerTextContainer}>
            <Text style={estilo.headerTitle}>Cuida Calasar</Text>
            <Text style={estilo.headerSubTitle}>Secretaria de Saúde do Piauí</Text>
          </View>
        </View>
      </View>
    )
  }
}
