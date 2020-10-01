import React, { Component } from 'react';
import { View } from 'react-native';
import estilo from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import {colors} from '../../commons';

export default class NotificacoesScreen extends Component {
  static navigationOptions = {
    title: 'Notificações',
    headerStyle: {
      backgroundColor: colors.mainColor,
    },
    headerTintColor: '#fff',
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