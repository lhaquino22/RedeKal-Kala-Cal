import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class MenuUsuario extends Component {
  render() {
    const navigate = this.props.navigate;

    return (
      <View style={estilo.menuContainer}>
        <View style={estilo.card}>
            <MaterialIcons name='group' size={30} color='white'/>
            <Text style={estilo.texto}>Usuários</Text>
        </View>
        <View style={estilo.card}>
            <MaterialIcons name='notifications' size={30} color='white'/>
            <Text style={estilo.texto}>Notificações</Text>
        </View>
        <View style={estilo.card}>
            <MaterialIcons name='account-circle' size={30} color='white'/>
            <Text style={estilo.texto}>Perfil</Text>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  menuContainer:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent:'space-between',
    borderBottomWidth:3,
    borderColor:"lightcoral",
    marginHorizontal:10,
    backgroundColor:"tomato"
  },
  card:{
      paddingBottom:10,
      flexDirection:'column',
      alignItems:'center'
  },
  texto:{
      fontWeight:'bold',
      color:'white'
  }
})