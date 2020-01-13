import React, { Component } from 'react';
import { View } from 'react-native';
import estilo from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../components/LoadingComponent';

export default class NotificacoesScreen extends Component {
  static navigationOptions = {
    title: 'Notificações',
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