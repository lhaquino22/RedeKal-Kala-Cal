import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

const marcadores = [
  {
    title: 'Felipe Barros',
    description: "Realmente um príncipe",
    coordinate: {
      latitude: -5.0335998,
      longitude: -42.4581812
    }
  },
  {
    title: 'Gabriel Araújo',
    description: "Fofo demais, mano",
    coordinate: {
      latitude: -5.0335998,
      longitude: -42.4481715
    }
  },
  {
    title: 'Felipe Caminha',
    description: "Uau",
    coordinate: {
      latitude: -5.0391329,
      longitude: -42.4605576
    }
  },
  {
    title: 'Felipe Jordan',
    description: "Tá funfando!",
    coordinate: {
      latitude: -5.0391259,
      longitude: -42.4602576
    }
  }

]

export default class GeorrefScreen extends Component {
  state = {
    chave: "",
    visible: true
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(marcadores.map((m) => m.coordinate), {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: true,
    });
  }

  fitOneMarker(coord) {
    this.map.fitToCoordinates([coord], {
      edgePadding: { top: 200, right: 200, bottom: 200, left: 200 },
      animated: true,
    });
  }

  componentDidMount() {
    this.fitAllMarkers();
  }

  handleInputChange(e) {
    this.setState({ chave: e });
  }

  pegarNomes(chave) {
    if (chave == "") {
      return undefined
    }

    elementos = []
    marcadores.map((elemento) => {
      if (elemento.title.includes(chave)) {
        elementos.push(elemento)
      }
    })

    return elementos
  }

  render() {
    const teste = (
      <View style={estilo.itemContainer}>
        <FlatList
          data={this.pegarNomes(this.state.chave)}
          renderItem={({ item }) => <TouchableOpacity onPress={() => {this.fitOneMarker(item.coordinate)}}><Text style={estilo.item}>{item.title}</Text></TouchableOpacity>}
          keyExtractor={(item) => item.title}
          keyboardShouldPersistTaps='handled'
        />
      </View>
    )

    return (
        <View style={{ flex: 1 }}>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: -5.0373378,
              longitude: -42.4814447,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {marcadores.map((marker, i) => (
              <Marker key={i} identifier={`id${i}`} coordinate={marker.coordinate} title={marker.title}
                description={marker.description} />
            ))}
          </MapView>
          <View style={estilo.inputContainer}>
            <TextInput placeholder="Procurar por nome" style={estilo.input} name='chave' keyboardShouldPersistTaps={'handled'} value={this.state.chave} onChangeText={(e) => this.handleInputChange(e)} />
          </View>
          <View style={estilo.buttonContainer}>
            <TouchableOpacity onPress={() => this.fitAllMarkers()}>
              <View style={estilo.button}>
                <MaterialCommunityIcons name='image-filter-center-focus' size={30} color='black' />
              </View>
            </TouchableOpacity>
          </View>
          {teste}
        </View >
    )
  }
}

const estilo = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5
  },
  itemContainer: {
    position: 'absolute',
    top: 40,
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  item: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderBottomWidth: 1,
    color: 'gray'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
})