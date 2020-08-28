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
import styles from './styles';
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import { SignUp } from '../../config/firebase';
import Loading from '../../components/LoadingComponent';
import moment from 'moment';

var _ = require('lodash');

const Form = t.form.Form;
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

const parentStyle = _.cloneDeep(stylesheet);
const childStyle = _.cloneDeep(stylesheet);

parentStyle.fieldset.flex = 1;
parentStyle.fieldset.flexDirection = 'row';

childStyle.formGroup.normal.flex = 1;

var Sexo = t.enums({
  Feminino: 'Feminino',
  Masculino: 'Masculino',
});

const FixaReferencia = t.struct({
  unidadeOrigem: t.String,
  unidadeDestino: t.String,
  municipioOrigem: t.String,
  NomeDoPaciente: t.String,
  idadeSexo: t.struct({
    idade: t.Number,
    sexo: Sexo,
  }),
  historiaClinica: t.String,
  hipoteseDiagnostica: t.String,
  date: t.Date,
  medico: t.String,
});

const options = {
  fields: {
    unidadeOrigem: {
      label: 'Unidade de Origem',
      error: 'Por favor, preencha o campo unidade de origem.',
    },
    unidadeDestino: {
      label: 'Unidade de destino',
      error: 'Por favor, preencha o campo unidade de destino.',
    },
    NomeDoPaciente: {
      label: 'Nome do paciente',
      error: 'Por favor, preencha o campo nome do paciente.',
    },
    idadeSexo: {
      stylesheet: parentStyle,
      label: ' ',
      fields: {
        sexo: {
          stylesheet: childStyle,
          label: 'Sexo',
          error: 'Por favor, informe o sexo do paciente.',
        },
        idade: {
          stylesheet: childStyle,
          label: 'Idade',
          error: 'Por favor, informe a idade do paciente.',
        },
      },
    },
    medico: {
      label: 'Médico',
      error: 'Por favor, informe o médico reponsável.',
    },
    historiaClinica: {
      label: 'História clínica',
    },
    hipoteseDiagnostica: {
      label: 'Hipótese diagnóstica ',
    },
    date: {
      mode: 'date',
      label: 'Data',
      config: {
        defaultValueText: moment(moment.now()).format('DD/MM/YYYY'), // Allows you to format the PlaceHolders !!
        format: (date) => {
          return moment(date).format('DD/MM/YYYY'); // Allows you to format the date !!
        },
      },
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
    title: 'Criar referência',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  getType(value) {
    return FixaReferencia;
  }

  onChange = (value) => {};

  handleSubmit = () => {
    this.setState({ loading: true });
    const dados = this._form.getValue();
    if (dados != null) {
      const values = Object.assign({}, dados);
      // SignUp(values)
      //   .then(() => {
      //     this.setState({ loading: false });
      //     this.props.navigation.navigate('Entrar');
      //   })
      //   .catch(() => {
      //     this.setState({ loading: false });
      //   });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loading loading={this.state.loading} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
          keyboardVerticalOffset={65}
        >
          <View style={styles.content}>
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
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
