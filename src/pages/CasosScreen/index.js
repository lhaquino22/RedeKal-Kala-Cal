import React, { Component } from 'react';
import { Alert, View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import estilo from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { getCasos, delCaso } from '../../../CasoAction';
import { connect } from 'react-redux';
import * as firebase from "firebase";

class CasosScreen extends Component {
  state = {
    busca: false,
    lista: []
  }

  procurar = (chave) => {
    var achados = []
    var casos = this.props.casos.casos;

    if (chave == '') {
      this.setState({ lista: casos, busca: false });
      return;
    }
    for (let i = 0; i < casos.length; i++) {
      if (casos[i].nome.includes(chave)) {
        achados.push(casos[i]);
      }

    }

    this.setState({ lista: achados, busca: true })
  }

  deletarAlert = (index) => {
    Alert.alert("Remoção", "Tem certeza que deseja remover este caso?",
      [
        {
          text: "Cancelar", onPress: () => null
        },
        {
          text: "Sim", onPress: () => this.deletar(index)
        },
      ])
  }

  deletar = (index) => {
    var db = firebase.firestore();
    var caso = this.props.casos.casos[index];
    const id = caso.id;
    this.props.delCaso(index);
    db.collection('fichas').doc(id).delete();
  }

  render() {
    const { lista, busca } = this.state;
    var dados;

    if (busca == true) {
      dados = lista;
    }
    else {
      dados = this.props.casos.casos;
    }

    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput placeholder="Procurar Caso" style={estilo.input} onChangeText={this.procurar} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Caso')}>
                <View style={{ backgroundColor: '#00A198', padding: 3, borderRadius: 5 }}>
                  <MaterialCommunityIcons name='account-plus' color='white' size={25} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ marginLeft: 5, backgroundColor: '#00A198', padding: 3, borderRadius: 5 }}>
                  <MaterialCommunityIcons name='dog-side' color='white' size={25} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            {dados.map((marcador, i) => {
              return (
                <View style={estilo.item} key={i}>
                  <View style={estilo.item_info} key={marcador.title}>
                    <MaterialCommunityIcons name={marcador.caso_confirmado ? 'account-alert' : 'account'}
                      color={marcador.caso_confirmado ? 'red' : 'orange'} size={30} />
                    <View style={estilo.titulo}>
                      <Text style={estilo.tituloTexto}>{marcador.nome}</Text>
                      <Text style={estilo.subtitulo}>{marcador.caso_confirmado ? 'Confirmado' : 'Suspeito'}</Text>
                    </View>
                  </View>
                  <View style={estilo.item_info}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Caso', { index: i })}>
                      <MaterialCommunityIcons name='account-edit' size={30} color="lightslategrey" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deletarAlert(i)} style={{marginLeft: 5}}>
                      <MaterialCommunityIcons name='delete' size={30} color="indianred" />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { casos } = state
  return { casos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getCasos, delCaso
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CasosScreen);