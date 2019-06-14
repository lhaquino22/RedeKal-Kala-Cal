import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Perfil from './components/Perfil';
import MenuUsuario from './components/MenuUsuario';
import Menu from './components/Menu';

const itens = [
  { titulo: "Leishmaniose Visceral", icone: "ios-paper", screen: "Leishmaniose" },
  { titulo: "Linha de Cuidado ao paciente com Calazar", icone: "ios-git-pull-request", screen: "LinhaDeCuidado" },
  { titulo: "Georreferenciamento dos casos", icone: "md-pin", screen: "Georreferenciamento" },
  { titulo: "Plano de Enfrentamento e Controle das Doenças Negligenciada no Estado do Piauí", icone: "md-book", screen: "Home" },
  { titulo: "Pontos de Cuidado no Estado do Piauí", icone: "md-home", screen: "Home" },
  { titulo: "Sobre", icone: "md-information-circle", screen: "Home" }
]

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Leish | Line Care',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontSize: 20
    },
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex:1}}>
        <View>
          <Perfil/>
        </View>
        <View>
          <MenuUsuario navigate={navigate}/>
        </View>
        <View style={{flex:1}}>
          <Menu navigate={navigate}/>
        </View>
      </View>
    );
  }
}