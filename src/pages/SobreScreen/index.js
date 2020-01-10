import React, { Component } from 'react';
import { View, Text } from 'react-native';
import estilo from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class SobreScreen extends Component {
  static navigationOptions = {
    title: 'Sobre o Aplicativo',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}