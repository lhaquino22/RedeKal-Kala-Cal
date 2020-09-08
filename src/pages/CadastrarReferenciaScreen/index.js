import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Platform,
} from 'react-native';
import styles from './styles';
import 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import firebase from '../../services/firebase';
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

var Sexo = t.enums({
  Feminino: 'Feminino',
  Masculino: 'Masculino',
});

const FixaReferencia = t.struct({
  unidadeOrigem: t.String,
  unidadeDestino: t.String,
  municipioOrigem: t.String,
  NomeDoPaciente: t.String,
  idade: t.Number,
  sexo: Sexo,
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
    sexo: {
      label: 'Sexo',
      error: 'Por favor, informe o sexo do paciente.',
    },
    idade: {
      label: 'Idade',
      error: 'Por favor, informe a idade do paciente.',
    },
    medico: {
      label: 'Médico',
      error: 'Por favor, informe o médico reponsável.',
    },
    historiaClinica: {
      label: 'História clínica',
      multiline: true,
      stylesheet: {
        ...stylesheet,
        textbox: {
          ...stylesheet.textbox,
          normal: {
            ...stylesheet.textbox.normal,
            borderWidth: 1,
            borderColor: '#00A198',
            height: 100,
            textAlignVertical: 'top',
          },
          error: {
            ...stylesheet.textbox.error,
            borderWidth: 1,
            borderColor: '#00A198',
            height: 100,
            textAlignVertical: 'top',
          },
        },
        textboxView: {
          ...stylesheet.textboxView,
          normal: {
            borderWidth: 0,
          },
          error: {
            borderWidth: 0,
          },
        },
      },
    },
    hipoteseDiagnostica: {
      label: 'Hipótese diagnóstica ',
      multiline: true,
      stylesheet: {
        ...stylesheet,
        textbox: {
          ...stylesheet.textbox,
          normal: {
            ...stylesheet.textbox.normal,
            borderWidth: 1,
            borderColor: '#00A198',
            height: 100,
            textAlignVertical: 'top',
          },
          error: {
            ...stylesheet.textbox.error,
            borderWidth: 1,
            borderColor: '#00A198',
            height: 100,
            textAlignVertical: 'top',
          },
        },
        textboxView: {
          ...stylesheet.textboxView,
          normal: {
            borderWidth: 0,
          },
          error: {
            borderWidth: 0,
          },
        },
      },
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
    value: this.getInitialState( this.props.navigation.getParam('data', null)),
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

  getInitialState( data ) {
    if (data){
      data.date = moment(data.date.seconds*1000).toDate()
      return data;
    }
    const date = moment(moment.now()).toDate();
    value = {
      unidadeOrigem: 'ok',
      unidadeDestino: 'ok',
      municipioOrigem: 'ok',
      NomeDoPaciente: 'ok',
      sexo: 'Feminino',
      idade: 18,
      medico: 'ok',
      historiaClinica: 'ok',
      hipoteseDiagnostica: 'ok',
      date: date,
      id:'',
    };
    
    return value;
  }

  getType(value) {
    return FixaReferencia;
  }

  onChange = (value) => {
    this.setState({ value });
  };

  handleSubmit = () => {
    //this.setState({ loading: true });
    const user = firebase.auth().currentUser;
    const dados = this._form.getValue();
    if (dados != null) {
      const value = Object.assign(
        {},
        dados,
        { user: user.uid },
        { contra_ref: false }
      );
      console.log(value);
      const db = firebase.firestore();
      db.collection('ref_contra_ref')
        .add(value)
        .then(function (docRef) {
          Alert.alert('Notificação', 'Caso cadastrado com sucesso!');
          // criar algo pra mandar a notificação pro hospital
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
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
            <View style={styles.content}>
              <Form
                ref={(c) => (this._form = c)}
                type={this.state.type}
                value={this.state.value}
                options={this.state.options}
                onChange={this.onChange}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.text}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
