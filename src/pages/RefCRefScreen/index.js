import React, { Component } from 'react';
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import estilo from './styles';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../services/firebase';
import Loading from '../../components/LoadingComponent';
import { colors } from '../../commons';

class RefCRefScreen extends Component {
  state = {
    busca: false,
    data: [],
    search_data: [],
    refreshing: false,
    loading: false,
  };

  static navigationOptions = {
    title: `Referência e Contra-ref`,
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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

  search = (keyword) => {
    var found = [];
    var data = this.state.data;

    if (keyword == '') {
      this.setState({ data, busca: false });
      return;
    }
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].NomeDoPaciente.toLowerCase().includes(keyword.toLowerCase())
      ) {
        found.push(data[i]);
      }
    }
    this.setState({ search_data: found, busca: true });
  };

  loadData = async () => {
    await this.setState({ loading: true });
    await this._getData();
    await this.setState({ loading: false });
  };

  handleRefresh = async () => {
    await this.setState({ refreshing: true });
    await this._getData();
    await this.setState({ refreshing: false });
  };

  componentDidMount() {
    this.loadData();
  }

  deletarAlert = (index) => {
    Alert.alert(
      'Remoção',
      'Tem certeza que deseja remover este caso referenciado?',
      [
        {
          text: 'Cancelar',
          onPress: () => null,
        },
        {
          text: 'Sim',
          onPress: () => this.deletar(index),
        },
      ]
    );
  };

  deletar = (index) => {
    var db = firebase.firestore();
    var item = this.state.data[index];
    const id = item.id;
    db.collection('ref_contra_ref').doc(id).delete();
  };

  render() {
    const { data, search_data, busca } = this.state;
    var dados = [];

    if (busca == true) {
      dados = search_data;
    } else {
      dados = data;
    }

    return (
      <View style={estilo.container}>
        <Loading loading={this.state.loading} />

        <View style={estilo.content}>
          <View style={estilo.searchbar}>
            <TextInput
              placeholder="Procurar por nome do paciente"
              style={estilo.input}
              onChangeText={this.search}
            />

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CadastrarReferencia', {
                  onGoBack: this.handleRefresh,
                })
              }
            >
              <View style={estilo.addButton}>
                <Icon
                  name="file-document-box-plus-outline"
                  color="white"
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
          >
            {dados.length == 0 ? (
              busca ? (
                <Text style={estilo.warning}>Nenhum caso encontrado</Text>
              ) : (
                <Text style={estilo.warning}>Nenhum caso cadastrado</Text>
              )
            ) : null}

            {dados.map((item, i) => {
              return (
                <View style={estilo.casoContainer} key={item.id}>
                  <View style={estilo.casoSubContainer}>
                    <Icon
                      name={item.contra_ref ? 'account' : 'account-alert'}
                      size={30}
                      color={item.contra_ref ? colors.mainColor : 'orange'}
                    />
                    <View style={estilo.textoContainer}>
                      <Text
                        style={estilo.texto}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.NomeDoPaciente}
                      </Text>
                      <Text style={estilo.subtitulo}>
                        {item.contra_ref
                          ? 'Referenciado'
                          : 'Aguardando Contra-referência'}
                      </Text>
                    </View>
                  </View>
                  <View style={estilo.buttonsContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(
                          'ReferenciaInfomacoesScreen',
                          {
                            data: item,
                            onGoBack: this.handleRefresh,
                          }
                        )
                      }
                    >
                      <Icon
                        name="file-document-edit-outline"
                        size={30}
                        color="lightslategrey"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deletarAlert(i)}>
                      <Icon
                        name="delete"
                        size={30}
                        color="indianred"
                        style={estilo.icone}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default RefCRefScreen;
