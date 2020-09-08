import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from '../../commons';
import firebase from '../../services/firebase';

class ReferenciaInfoScreen extends Component {
  static navigationOptions = {
    title: 'Informação do Referenciamento',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    busca: false,
    data: {},
    search_data: [],
    refreshing: false,
    loading: false,
  };

  _getData = async () => {
    const db = firebase.firestore();
    const user = await firebase.auth().currentUser;
    let data = [];

    await db
      .collection('ref_contra_ref')
      .where('user', '==', user.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          data.push(Object.assign({}, doc.data(), { id: doc.id }));
        });
      });

    this.setState({ data });
  };

  handleCriaContraRef = async () => {};

  handleEditar = async () => {
    this.props.navigation.navigate('CadastrarReferencia', {
      data: this.state.data,
    })
  };

  async componentDidMount() {
    const { navigation } = this.props;
    await this.setState({ data: navigation.getParam('data', {}) });
  }

  render() {
    const {
      NomeDoPaciente,
      idade,
      hipoteseDiagnostica,
      historiaClinica,
      medico,
      municipioOrigem,
      sexo,
      unidadeDestino,
      unidadeOrigem,
      contra_ref,
    } = this.state.data;

    return (
      <>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.container}>
            <View style={style.content}>
              <Text style={style.title}>{NomeDoPaciente}</Text>
              <View style={style.infoContainer}>
                <Text style={style.property}>Idade: </Text>
                <Text style={style.description}>{idade}</Text>
              </View>

              <View style={style.infoContainer}>
                <Text style={style.property}>Sexo: </Text>
                <Text style={style.description}>{sexo}</Text>
              </View>

              <View style={style.infoContainer}>
                <Text style={style.property}>Município de Origem: </Text>
                <Text style={style.description}>{municipioOrigem}</Text>
              </View>

              <View style={style.infoContainer}>
                <Text style={style.property}>Médico: </Text>
                <Text style={style.description}>{medico}</Text>
              </View>

              <View style={style.infoContainer2}>
                <Text style={style.property}>Hipótese Diagnóstica: </Text>
                <Text style={style.description}>{hipoteseDiagnostica}</Text>
              </View>

              <View style={style.infoContainer2}>
                <Text style={style.property}>História Clínica: </Text>
                <Text style={style.description}>{historiaClinica}</Text>
              </View>

              <View style={style.infoContainer2}>
                <Text style={style.property}>Unidade de Origem: </Text>
                <Text style={style.description}>{unidadeOrigem}</Text>
              </View>

              <View style={style.infoContainer2}>
                <Text style={style.property}>Unidade de Destino: </Text>
                <Text style={style.description}>{unidadeDestino}</Text>
              </View>

              {contra_ref ? (
                <View>
                  <Text style={style.title}>Fixa de Contra-referência</Text>
                  <View style={style.infoContainer}>
                    <Text style={style.property}>Responsável: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Diagnóstico: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Conduta terapêutica: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Sugestões: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Retorno do paciente:: </Text>
                    <Text style={style.description}>
                      {unidadeDestino} dia; mês(es); ano(s) à clínica
                      especializada
                    </Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Data: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>

                  <View style={style.infoContainer}>
                    <Text style={style.property}>Médico: </Text>
                    <Text style={style.description}>{unidadeDestino}</Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={style.button}
            onPress={this.handleCriaContraRef}
          >
            <Icon
              name="file-document-box-plus-outline"
              color="white"
              size={24}
            />
            <Text style={style.buttonText}>Criar Contra-referência</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={this.handleEditar}>
            <Icon name="file-document-edit-outline" size={24} color="white" />
            <Text style={style.buttonText}>Editar Informações</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    padding: 10,
    paddingBottom: 0,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  infoContainer2: {
    flex: 1,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  property: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#6C6C80',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ReferenciaInfoScreen;
