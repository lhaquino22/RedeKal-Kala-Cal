import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import estilo from './styles';

export default class ContaScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={estilo.container}>
        <TouchableOpacity 
          style={estilo.button}
          onPress={() => navigate("EntrarScreen")}
        >
          <Text style={estilo.text}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={estilo.button}
          onPress={() => navigate("CadastrarScreen")}
        >
          <Text style={estilo.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}