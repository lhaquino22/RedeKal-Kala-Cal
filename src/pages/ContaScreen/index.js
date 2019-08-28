import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import estilo from './styles';
import firebase from '../../config/firebase'
import { ScrollView } from 'react-native-gesture-handler';
export default class ContaScreen extends Component {
  static navigationOptions = {
    title: 'Meus Dados',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      itens: {
        nome: {
          title: "Nome",
          info: "",
          icon: "",
        },
        email: {
          title: "E-mail",
          info: "",
          icon: "",
        },
        cpf: {
          title: "CPF",
          info: "",
          icon: "",
        },
        cidade: {
          title: "Cidade",
          info: "",
          icon: "",
        },
        estado: {
          title: "Estado",
          info: "",
          icon: "",
        },
        categoria_profissional: {
          title: "Categoria Profissional",
          info: "",
          icon: "",
        },
        cns: {
          title: "CNS",
          info: "",
          icon: "",
        },
        cnes: {
          title: "CNES",
          info: "",
          icon: "",
        },
        nivel_escolaridade: {
          title: "Nível de Escolaridade",
          info: "",
          icon: "",
        },
        tipo_usuario: {
          title: "Tipo de Usuário",
          info: "",
          icon: "",
        }
      }
    };
  }

  componentDidMount() {
    this.getData()
  }

  _signOutFirebase = () => {
    firebase.auth().signOut().then(
      this._signOutAsync
    ).catch(function (error) {
      alert(error)
    });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  getData = async () => {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var name, email;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      var docRef = db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          var data = doc.data()
          const entries = Object.entries(data)
          var itens = { ...this.state.itens }

          for (const [key, info] of entries) {
            itens[key].info = info
            console.log(key);
          }
          itens["email"].info = email
          this.setState({ itens: itens })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

  }

  renderItens = (itens) => {
    const keys = Object.keys(itens)
    return keys.map((item, index) =>
      <View
        key={index}
        style={estilo.item}>
        <View style={estilo.itemIcon}><MaterialCommunityIcons name='account' size={32} color="#00A198" /></View>
        <View style={estilo.itemInfo}>
          <Text style={estilo.itemText1}>{itens[item].title}</Text>
          <Text style={estilo.itemText2}>{itens[item].info}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={estilo.container}>
        <ScrollView contentContainerStyle={estilo.content}>
          {this.renderItens(this.state.itens)}
        </ScrollView>
        <TouchableOpacity
          style={estilo.button}
          onPress={this._signOutFirebase}
        >
          <Text>Sair :)</Text>
        </TouchableOpacity>
      </View>
    );
  }
}