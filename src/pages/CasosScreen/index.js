import React, { Component } from 'react';
import { Alert, View, TextInput, TouchableOpacity, RefreshControl, Text } from 'react-native';
import estilo from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { getCasos, delCaso } from '../../../CasoAction';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import Loading from '../../components/LoadingComponent';

class CasosScreen extends Component {
  state = {
    busca: false,
    lista: [],
    refreshing: false,
    loading: false
  }

  getCasos = (refresh=false) => {
    if(!refresh){
      this.setState({ loading: true });
    }
    else{
      this.setState({ refresh: true });
    }
    
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var casos = []

    db.collection('casos').where("user", "==", user.uid).get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          casos.push(Object.assign({}, doc.data(), { id: doc.id }));
        })
        this.props.getCasos(casos);
        if(!refresh){
          this.setState({ loading: false });
        }
        else{
          this.setState({ refresh: false });
        }
      });
  }

  componentDidMount() {
    this.getCasos();
  }

  procurar = (chave) => {
    var achados = []
    var casos = this.props.casos.casos;

    if (chave == '') {
      this.setState({ lista: casos, busca: false });
      return;
    }
    for (let i = 0; i < casos.length; i++) {
      if (casos[i].dados_pessoais.nome.includes(chave)) {
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
    db.collection('casos').doc(id).delete();
  }

  teste = () => {

  }

  render() {
    const { lista, busca } = this.state;
    var dados = [];

    if (busca == true) {
      dados = lista;
    }
    else {
      dados = this.props.casos.casos;
    }

    return (
      <View style={estilo.container}>
        <Loading loading={this.state.loading} />
        <View style={estilo.content}>
          <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput placeholder="Procurar por nome" style={estilo.input} onChangeText={this.procurar} />
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
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.getCasos(true)}
            />}>
            {
              dados.length == 0 ?
                busca ?
                  <Text style={estilo.warning}>Nenhum caso encontrado</Text> :
                  <Text style={estilo.warning}>Nenhum caso cadastrado</Text> :
                null
            }

            {dados.map((marcador, i) => {
              return (
                <View style={estilo.casoContainer} key={marcador.id}>
                  <View style={estilo.casoSubContainer}>
                    <MaterialCommunityIcons name={marcador.dados_conclusao.caso_confirmado != "1" ? 'account-alert' : 'account'}
                      size={30} color={marcador.dados_conclusao.classificacao_final == "1" ? 'indianred' : 'orange'} />
                    <View style={estilo.textoContainer}>
                      <Text style={estilo.texto} ellipsizeMode="tail" numberOfLines={1}>{marcador.dados_pessoais.nome}</Text>
                      <Text style={estilo.subtitulo}>{marcador.dados_conclusao.classificacao_final == "1" ? 'Confirmado' : 'Suspeito'}</Text>
                    </View>
                  </View>
                  <View style={estilo.buttonsContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Caso', { index: i })}>
                      <MaterialCommunityIcons name='account-edit' size={30} color="lightslategrey" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deletarAlert(i)}>
                      <MaterialCommunityIcons name='delete' size={30} color="indianred" style={estilo.icone} />
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