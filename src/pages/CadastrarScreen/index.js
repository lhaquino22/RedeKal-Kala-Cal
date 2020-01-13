import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import estilo from './styles';
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import { SignUp } from '../../config/firebase';
import Loading from '../../components/LoadingComponent';

const Form = t.form.Form;

var Escolaridade = t.enums({
  'Ens. Fundamental Incompleto': 'Ens. Fundamental Incompleto',
  'Ens. Fundamental Completo': 'Ens. Fundamental Completo',
  'Ens. Médio Incompleto': 'Ens. Médio Incompleto',
  'Ens. Médio Completo': 'Ens. Médio Completo',
  'Ens. Superior Incompleto': 'Ens. Superior Incompleto',
  'Ens. Superior Completo': 'Ens. Superior Completo',
  'Especialização Incompleta': 'Especialização Incompleta',
  'Especialização Completa': 'Especialização Completa',
  'Mestrado Incompleto': 'Mestrado Incompleto',
  'Mestrado Completo': 'Mestrado Completo',
  'Doutorado Incompleto': 'Doutorado Incompleto',
  'Doutorado Completo': 'Doutorado Completo'
})

var Profissional = t.enums({
  'Profissional de Saúde': 'Profissional de Saúde',
  'Gestor do Município': 'Gestor do Município',
  'Coordenador da Atenção Básica': 'Coordenador da Atenção Básica'
})

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Senha = t.refinement(t.String, senha => {
  return senha.length >= 6;
});

const User = t.struct({
  nome: t.String,
  cpf: t.Number,
  cnes: t.Number,
  cns: t.Number,
  cidade: t.String,
  estado: t.String,
  categoria_profissional: Profissional,
  escolaridade: Escolaridade,
  email: Email,
  password: Senha
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
    password: {
      label: 'Senha',
      error: 'A senha deve conter pelo menos 6 caracterers.',
      password: true,
      secureTextEntry: true
    },
    categoria_profissional: {
      label: 'Categoria Profissional'
    },
    escolaridade: {
      label: 'Nível de Escolaridade'
    },
    cns: {
      label: 'CNS'
    },
    cnes: {
      label: 'CNES'
    },
    cpf: {
      label: 'CPF'
    },
    email: {
      error: 'Insira um email válido.'
    }
  },
  stylesheet: stylesheet
}

export default class CadastrarScreen extends Component {
  state = {
    loading: false
  }
  static navigationOptions = {
    title: 'Cadastre-se',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleSubmit = () => {
    this.setState({loading: true})
    const dados = this._form.getValue();
    if (dados != null) {
      const values = Object.assign({}, dados);
      SignUp(values).then(() => {
        this.setState({loading: false});
        this.props.navigation.navigate('Entrar');
      })
      .catch(() => {
        this.setState({loading: false});
      })
    }
    else{
      this.setState({loading: false})
    }
  }

  render() {
    return (
      <View style={estilo.container}>
        <Loading loading={this.state.loading} />
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={65}>
          <View style={estilo.content}>
            <ScrollView>
              <Form ref={c => this._form = c} type={User} options={options} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={estilo.button}
          onPress={this.handleSubmit}
        >
          <Text style={estilo.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}