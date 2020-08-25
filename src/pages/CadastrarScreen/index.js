import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
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
  'Doutorado Completo': 'Doutorado Completo',
}, 'Escolaridade');

var Profissional = t.enums({
  'Profissional de Saúde': 'Profissional de Saúde',
  'Gestor do Município': 'Gestor do Município',
  'Gestor Hospitalar': 'Gestor Hospitalar',
});

var LocalTrabalho = t.enums({
  'Unidade Básica de Saúde': 'Unidade Básica de Saúde',
  Hospital: 'Hospital',
  'Secretaria Municipal de Saúde - Coordenação':
    'Secretaria Municipal de Saúde - Coordenação',
  Outro: 'Outro',
});

const Email = t.refinement(t.String, (email) => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Senha = t.refinement(t.String, (senha) => {
  return senha.length >= 6;
});

const ProfissionalSaude = t.struct({
  categoria_profissional: Profissional,
  nome: t.String,
  cpf: t.Number,
  cidade: t.String,
  estado: t.String,
  escolaridade: Escolaridade,
  local_trabalho: LocalTrabalho,
  outro: t.String,
  email: Email,
  password: Senha,
});

const GestorMunicipio = t.struct({
  categoria_profissional: Profissional,
  nome: t.String,
  cpf: t.Number,
  cidade: t.String,
  estado: t.String,
  escolaridade: Escolaridade,
  email: Email,
  password: Senha,
});

const GestorHospitalar = t.struct({
  categoria_profissional: Profissional,
  nome: t.String,
  cpf: t.Number,
  cidade: t.String,
  estado: t.String,
  escolaridade: Escolaridade,
  hospital: t.String,
  email: Email,
  password: Senha,
});

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
      secureTextEntry: true,
    },
    categoria_profissional: {
      label: 'Categoria Profissional',
    },
    escolaridade: {
      label: 'Nível de Escolaridade',
    },
    cns: {
      label: 'CNS',
    },
    cnes: {
      label: 'CNES',
    },
    cpf: {
      label: 'CPF',
    },
    email: {
      error: 'Insira um email válido.',
    },
    local_trabalho: {
      label: 'Local de trabalho',
    },
    hospital: {
      label: 'Hospital',
    },
    outro: {
      label: 'Outro',
      editable: false
    },
  },
  stylesheet: stylesheet,
};

export default class CadastrarScreen extends Component {
  state = {
    loading: false,
    value: {},
    type: this.getType({}),
    options: options,
  };
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

  getType(value) {
    if (value.categoria_profissional === 'Gestor do Município') {
      return GestorMunicipio;
    } else if (value.categoria_profissional === 'Gestor Hospitalar') {
      return GestorHospitalar;
    } else {
      return ProfissionalSaude;
    }
  }

  onChange = (value) => {
    // recalculate the type only if strictly necessary
    const type =
      value.categoria_profissional !== this.state.value.categoria_profissional
        ? this.getType(value)
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
      <View style={estilo.container}>
        <Loading loading={this.state.loading} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={65}
        >
          <View style={estilo.content}>
            <ScrollView>
              <Form
                ref={(c) => (this._form = c)}
                type={this.state.type}
                value={this.state.value}
                options={this.state.options}
                onChange={this.onChange}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={estilo.button} onPress={this.handleSubmit}>
          <Text style={estilo.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
