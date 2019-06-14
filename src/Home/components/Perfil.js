import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={estilo.perfil}>
        <View style={estilo.imagemContainer}>
          <Image
            source={require('./logo.png')}
            style={estilo.imagem} />
        </View>
        <View style={estilo.usuario}>
          <Text style={estilo.nome}>Leish</Text>
          <Text style={estilo.cargo}>Line Care</Text>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  perfil: {
    alignItems: 'center',
    padding: 20,
    backgroundColor:'tomato'
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth:3,
    borderColor:"white"
  },
  imagemContainer: {
    marginBottom: 10
  },
  usuario: {
    alignItems: 'center'
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    color:'white'
  },
  cargo: {
    fontSize: 12,
    color:'white'
  }
})