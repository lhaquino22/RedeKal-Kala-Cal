import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const marcadores = [
  {
    title: 'Felipe Barros',
    description: "Realmente um príncipe",
    coordinate: {
      latitude: -5.0335998,
      longitude: -42.4581812
    },
    supeito: true
  },
  {
    title: 'Gabriel Araújo',
    description: "Fofo demais, mano",
    coordinate: {
      latitude: -5.0335998,
      longitude: -42.4481715
    },
    suspeito: false
  },
  {
    title: 'Felipe Caminha',
    description: "Uau",
    coordinate: {
      latitude: -5.0391329,
      longitude: -42.4605576
    },
    suspeito: true
  },
  {
    title: 'Felipe Jordan',
    description: "Tá funfando!",
    coordinate: {
      latitude: -5.0391259,
      longitude: -42.4602576
    },
    suspeito: false
  }

]

export default class CasosScreen extends Component {
  state = {
    chave: '',
    lista: marcadores
  }

  procurar = (chave) => {
    var achados = []
    const { lista } = this.state;

    if (chave == '') {
      this.setState({ lista: marcadores });
      return;
    }
    for (let i = 0; i < marcadores.length; i++) {
      if (marcadores[i].title.includes(chave)) {
        achados.push(marcadores[i]);
      }

    }

    this.setState({ lista: achados })
  }

  render() {
    const { lista } = this.state;
    return (
      <View style={estilo.fill}>
        <TextInput placeholder="Procurar Caso" style={estilo.input} onChangeText={this.procurar} />
        <View style={estilo.lista}>
          {
            lista.map((marcador) => {
              return (<View style={estilo.item} key={marcador.title}>
                <View style={estilo.titulo}>
                  <MaterialCommunityIcons name={marcador.suspeito ? 'account-alert' : 'account'}
                    color={marcador.suspeito ? 'orange' : 'red'} size={20} />
                  <Text style={estilo.tituloTexto}>{marcador.title}</Text>
                </View>
                <Text style={estilo.subtitulo}>{marcador.suspeito ? 'Suspeito' : 'Confirmado'}</Text>
              </View>)
            })
          }
        </View>
      </View >
    )
  }
}

const estilo = StyleSheet.create({
  fill: {
    margin: 10
  },
  input: {
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'rgba(211,211,211, 0.5)'
  },
  lista: {
    marginTop: 10
  },
  item: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray'
  },
  titulo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5
  },
  tituloTexto: {
    fontSize: 20,
    marginLeft: 5
  },
  subtitulo: {
    fontSize: 16,
    color: 'gray'
  }
})