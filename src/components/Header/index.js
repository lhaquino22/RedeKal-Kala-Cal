import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar } from 'react-native';
import estilo from './styles';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={estilo.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={estilo.headerBack}>
          <ImageBackground source={require('../../../assets/images/header_back.png')}
            style={estilo.image} />
        </View>
        <View style={estilo.headerFront}>
          <Image source={require('../../../assets/images/logo_back.png')}
            style={estilo.headerFrontImage} />
        </View>
        <View style={estilo.logoContainer}>
          <Image source={require('../../../assets/images/logo_horizontal.png')}
            style={estilo.logoImage} />
        </View>
      </View>
    )
  }
}
