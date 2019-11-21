import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCasos } from '../../../CasoAction';
import * as firebase from "firebase";

class GeorrefScreen extends Component {
  state = {
    chave: "",
    visible: true
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(this.props.casos.casos.map((c) => c.localizacao), {
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

  getFichas() {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var casos = []

    db.collection('fichas').where("user", "==", user.uid).get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          casos.push(doc.data());
        })
        this.props.getCasos(casos);
        this.fitAllMarkers();
      });
  }

  componentDidMount() {
    this.getFichas();
  }

  handleInputChange(e) {
    this.setState({ chave: e });
  }

  pegarNomes(chave) {
    if (chave == "") {
      return undefined
    }

    elementos = []
    this.props.casos.casos.map((caso) => {
      if (caso.nome.includes(chave)) {
        elementos.push(caso)
      }
    })

    return elementos
  }

  render() {
    const teste = (
      <View style={estilo.itemContainer}>
        <FlatList
          data={this.pegarNomes(this.state.chave)}
          renderItem={({ item }) => <TouchableOpacity onPress={() => { this.fitOneMarker(item.localizacao) }}><Text style={estilo.item}>{item.nome}</Text></TouchableOpacity>}
          keyExtractor={(item) => item.nome}
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
          {this.props.casos.casos.map((marker, i) => (
            <Marker key={i} identifier={`id${i}`} coordinate={marker.localizacao} title={marker.nome}
              description={marker.endereco} pinColor={marker.caso_confirmado ? 'red' : 'orange'} />
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

const mapStateToProps = (state) => {
  const { casos } = state
  return { casos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getCasos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GeorrefScreen);

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