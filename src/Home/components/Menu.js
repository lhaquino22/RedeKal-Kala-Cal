import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class Menu extends Component {
  render() {
    const navigate = this.props.navigate;

    return (
      <View style={estilo.menuContainer}>
        <View style={estilo.menuRow}>
          <TouchableOpacity onPress={() => navigate('Leishmaniose')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='library-books' size={30} color='tomato' />
              <Text style={estilo.texto}>Leishmaniose Visceral</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('LinhaDeCuidado')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='local-hospital' size={30} color='tomato' />
              <Text style={estilo.texto}>Linha de Cuidado ao paciente com Calazar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={estilo.menuRow}>
          <TouchableOpacity onPress={() => navigate('Georreferenciamento')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='place' size={30} color='tomato' />
              <Text style={estilo.texto}>Georreferenciamento dos Casos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Ainda em construção!')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='insert-chart' size={30} color='tomato' />
              <Text style={estilo.texto}>Plano de Enfrentamento e Controle</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={estilo.menuRow}>
          <TouchableOpacity onPress={() => alert('Ainda em construção!')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='home' size={30} color='tomato' />
              <Text style={estilo.texto}>Pontos de Cuidado no Estado do Piauí</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Ainda em construção!')} style={estilo.touchable}>
            <View style={estilo.card}>
              <MaterialIcons name='info' size={30} color='tomato' />
              <Text style={estilo.texto}>Sobre</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  menuContainer: {
    flex: 1,
    margin: 10
  },
  menuRow: {
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    margin: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f7f8f9'
  },
  texto: {
    textAlign: 'center',
    color: 'black'
  },
  touchable: {
    flex: 1
  }
})