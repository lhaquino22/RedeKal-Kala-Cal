import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Platform,
} from 'react-native';
import estilo from './styles';
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import axios from 'axios';

import { SignUp } from '../../services/firebase';
import Loading from '../../components/LoadingComponent';
import Form, {
  GestorHospitalar,
  ProfissionalSaude,
  GestorMunicipio,
  Credenciais,
  Default,
  options,
  stylesheet,
} from './form';
import { colors } from '../../commons';

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export default class CadastrarReferenciaScreen extends Component {
  state = {
    loading: false,
    value: {},
    type: this.getType({}, Default),
    options: options,
    formDefault: Default,
  };

  static navigationOptions = {
    title: 'Cadastre-se',
    headerStyle: {
      backgroundColor: colors.mainColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  async getEstados() {
    try {
      const response = await api.get('/estados');
      let estados = {};
      response.data.map((estado) => {
        estados[estado.sigla] = estado.nome;
      });
      return estados;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getCidades(UF) {
    try {
      const response = await api.get(`/estados/${UF}/municipios`);
      let cidades = {};
      response.data.map((cidade) => {
        cidades[cidade.nome] = cidade.nome;
      });
      return cidades;
    } catch (error) {
      console.error(error);
    }
  }

  changeEnum = (item, value) => {
    let d = this.state.formDefault;
    d[item] = t.enums(value);
    this.setState({ type: this.getType(this.state.value, d), formDefault: d });
  };

  async componentDidMount() {
    const estados = await this.getEstados();
    this.changeEnum('estado', estados);
  }

  getType(value, formDefault) {
    if (value.perfil_acesso === 'Gestor do Município') {
      return t.struct({
        ...formDefault,
        ...GestorMunicipio,
        ...Credenciais,
      });
    } else if (value.perfil_acesso === 'Gestor Hospitalar') {
      return t.struct({
        ...formDefault,
        ...GestorHospitalar,
        ...Credenciais,
      });
    } else {
      return t.struct({
        ...formDefault,
        ...ProfissionalSaude,
        ...Credenciais,
      });
    }
  }

  onChange = async (value) => {
    // recalculate the type only if strictly necessary
    if (value.estado != this.state.value.estado){
      const cidades = await this.getCidades(value.estado)
      this.changeEnum('cidade', cidades)
    }

    const type =
      value.perfil_acesso !== this.state.value.perfil_acesso
        ? this.getType(value, this.state.formDefault)
        : this.state.type;

    const options =
      value.local_trabalho === 'Outro'
        ? t.update(this.state.options, {
            fields: {
              outro: {
                editable: { $set: true },
              },
            },
          })
        : t.update(this.state.options, {
            fields: {
              outro: {
                editable: { $set: false },
              },
            },
          });
    
    this.setState({ options, value, type });
  };

  handleSubmit = () => {
    console.log(this.state.value)
    this.setState({ loading: true });
    const dados = this._form.getValue();
    if (dados != null) {
      const values = Object.assign({}, dados);
      SignUp(values)
        .then(() => {
          this.setState({ loading: false });
          this.props.navigation.navigate('Entrar');
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={estilo.container}>
          <Loading loading={this.state.loading} />
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
            keyboardVerticalOffset={65}
          >
            <View style={estilo.content}>
              <Form
                ref={(c) => (this._form = c)}
                type={this.state.type}
                value={this.state.value}
                options={this.state.options}
                onChange={this.onChange}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={estilo.button} onPress={this.handleSubmit}>
            <Text style={estilo.text}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
