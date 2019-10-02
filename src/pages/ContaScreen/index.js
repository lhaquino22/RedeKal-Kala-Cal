import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import estilo from './styles';
import firebase from '../../config/firebase'
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  nome: t.String,
  cpf: t.Number,
  cnes: t.Number,
  cns: t.Number,
  cidade: t.String,
  estado: t.String,
  categoria_profissional: t.String,
  escolaridade: t.String,
  email: t.String,
})

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.normal.fontSize = 16;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.controlLabel.normal.fontSize = 14;
stylesheet.controlLabel.normal.color = 'gray';

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.normal.fontSize = 4;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.normal.borderBottomColor = '#00A198';
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

const options = {
  fields: {
    categoria_profissional: {
      label: 'Categoria Profissional',
      editable: false
    },
    escolaridade: {
      label: 'Nível de Escolaridade',
      editable: false
    },
    cns: {
      label: 'CNS',
      editable: false
    },
    cnes: {
      label: 'CNES',
      editable: false
    },
    cpf: {
      label: 'CPF',
      editable: false
    },
    email: {
      error: 'Insira um email válido.',
      editable: false
    },
    nome: {
      editable: false
    },
    cidade: {
      editable: false
    },
    estado: {
      editable: false
    }
  },
  stylesheet: stylesheet
}

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

  state = {
    value: {
      nome: "",
      cpf: "",
      cnes: "",
      cns: "",
      cidade: "",
      estado: "",
      categorial_profissional: "",
      escolaridade: "",
      email: ""
    }
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

    if (user != null) {
      name = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      var docRef = db.collection("users").doc(user.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          data = Object.assign(data, {'email': email});
          this.setState({ value: data });
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

  }

  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <ScrollView>
            <Form
              ref={c => this._form = c}
              type={User} value={this.state.value}
              options={options} />
          </ScrollView>

        </View>
        <TouchableOpacity
          style={estilo.button}
          onPress={this._signOutFirebase}
        >
          <Text style={estilo.text}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}