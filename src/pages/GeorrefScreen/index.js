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
    this.map.fitToCoordinates(this.props.casos.casos.map((c) => c.geolocalizacao), {
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

    db.collection('casos').where("user", "==", user.uid).get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          casos.push(Object.assign({}, doc.data(), { id: doc.id }));
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
      if (caso.dados_pessoais.nome.includes(chave)) {
        elementos.push(caso)
      }
    })

    return elementos
  }

  render() {
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
            <Marker key={i} identifier={`id${i}`} coordinate={marker.geolocalizacao} title={marker.dados_pessoais.nome}
              description={marker.dados_residenciais.endereco} pinColor={marker.dados_conclusao.caso_confirmado ? 'red' : 'orange'} />
          ))}
        </MapView>
        <View style={estilo.inputContainer}>
          <TextInput placeholder="Procurar por nome" style={estilo.input} name='chave' keyboardShouldPersistTaps={'handled'} value={this.state.chave} onChangeText={(e) => this.handleInputChange(e)} />
          <View style={estilo.itemContainer}>
            <FlatList
              data={this.pegarNomes(this.state.chave)}
              renderItem={({ item }) => <TouchableOpacity onPress={() => { this.fitOneMarker(item.geolocalizacao) }}><Text style={estilo.item} >{item.dados_pessoais.nome}</Text></TouchableOpacity>}
              keyExtractor={(item) => item.dados_pessoais.nome}
            />
          </View>
        </View>
        <View style={estilo.buttonContainer}>
          <TouchableOpacity onPress={() => this.fitAllMarkers()} style={{ flex: 1 }}>
            <View style={estilo.button}>
              <MaterialCommunityIcons name='image-filter-center-focus' size={30} color='black' />
            </View>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 70,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10
  },
  input: {
    backgroundColor: 'white',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    flex: 1
  },
  itemContainer: {
    position: 'absolute',
    top: 35,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  item: {
    fontSize: 18,
    padding: 5,
    borderBottomWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white'
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    width: 60,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
})