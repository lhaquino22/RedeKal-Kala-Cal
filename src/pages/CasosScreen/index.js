import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import estilo from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { casos } from '../object';

export default class CasosScreen extends Component {
  state = {
    chave: '',
    lista: casos
  }

  procurar = (chave) => {
    var achados = []
    const { lista } = this.state;

    if (chave == '') {
      this.setState({ lista: casos });
      return;
    }
    for (let i = 0; i < casos.length; i++) {
      if (casos[i].nome.includes(chave)) {
        achados.push(casos[i]);
      }

    }

    this.setState({ lista: achados })
  }

  render() {
    const { lista } = this.state;
    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <TextInput placeholder="Procurar Caso" style={estilo.input} onChangeText={this.procurar} />
          <ScrollView>
            {lista.map((marcador) => {
              return (
                <TouchableOpacity>
                  <View style={estilo.item} key={marcador.title}>
                    <MaterialCommunityIcons name={marcador.caso_confirmado ? 'account-alert' : 'account'}
                      color={marcador.caso_confirmado ? 'red' : 'orange'} size={30} />
                    <View style={estilo.titulo}>
                      <Text style={estilo.tituloTexto}>{marcador.nome}</Text>
                      <Text style={estilo.subtitulo}>{marcador.caso_confirmado ? 'Suspeito' : 'Confirmado'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

// const estilo = StyleSheet.create({
//   fill: {
//     margin: 10
//   },
//   input: {
//     borderRadius: 6,
//     padding: 10,
//     backgroundColor: 'rgba(211,211,211, 0.5)'
//   },
//   lista: {
//     marginTop: 10
//   },
//   item: {
//     padding: 5,
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'gray'
//   },
//   titulo: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginBottom: 5
//   },
//   tituloTexto: {
//     fontSize: 20,
//     marginLeft: 5
//   },
//   subtitulo: {
//     fontSize: 16,
//     color: 'gray'
//   }
// })