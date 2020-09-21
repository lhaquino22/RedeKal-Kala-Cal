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

const textareaStyle = {
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
};

var Sexo = t.enums({
  Feminino: 'Feminino',
  Masculino: 'Masculino',
});

const FichaReferencia = t.struct({
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
const FichaContraReferencia = t.struct({
  NomeDoPaciente: t.String,
  unidadeOrigem: t.String,
  unidadeDestino: t.String,
  municipioOrigem: t.String,
  diagnostico: t.String,
  CondutaTerapeutica: t.String,
  sugestoes: t.maybe(t.String),
  dataRetorno: t.Date,
  medicoRetorno: t.String,
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
      stylesheet: textareaStyle,
    },
    hipoteseDiagnostica: {
      label: 'Hipótese diagnóstica ',
      multiline: true,
      stylesheet: textareaStyle,
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
    diagnostico: {
      label: 'Diagnóstico',
      multiline: true,
      stylesheet: textareaStyle,
    },
    CondutaTerapeutica: {
      label: 'Conduta terapêutica',
      multiline: true,
      stylesheet: textareaStyle,
    },
    sugestoes: {
      label: 'Sugestões',
      multiline: true,
      stylesheet: textareaStyle,
    },
    medicoRetorno: {
      label: 'Médico responsável',
    },
    dataRetorno: {
      mode: 'date',
      label: 'Data de retorno',
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Criar Referência'),
      headerStyle: {
        backgroundColor: '#00A198',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  state = {
    loading: false,
    options: this.getOptions(
      this.props.navigation.getParam('contraRef', false)
    ),
    value: this.getInitialState(this.props.navigation.getParam('data', null)),
    type: this.getType(this.props.navigation.getParam('contraRef', false)),
  };

  getInitialState(value) {
    if (value) {
      const date = value.date.seconds
        ? moment(value.date.seconds * 1000).toDate()
        : value.date;
      const dataRetorno = value.dataRetorno.seconds
        ? moment(value.dataRetorno.seconds * 1000).toDate()
        : value.dataRetorno;
      value = {
        ...value,
        date,
        dataRetorno,
      };
      return value;
    }
    const date = moment(moment.now()).toDate();
    const dataRetorno = moment(moment.now()).toDate();
    value = {
      unidadeOrigem: 'Hospital de José de Freitas',
      unidadeDestino: 'Hospital de Teresina',
      municipioOrigem: 'José de Freitas',
      NomeDoPaciente: 'Jubileu da Costa',
      sexo: 'Masculino',
      idade: 18,
      medico: 'Jon Junco Jonister',
      historiaClinica:
        'Maecenas eu pellentesque leo. Maecenas justo lorem, tristique vel condimentum id, vehicula sed diam. Etiam pellentesque condimentum sem, quis venenatis elit lobortis vitae. Mauris posuere ipsum sapien, at feugiat quam facilisis id. Fusce dictum, ante ac lobortis congue, turpis eros tempor eros, sed aliquet urna metus ac turpis',
      hipoteseDiagnostica:
        'Phasellus interdum erat eu turpis tincidunt dignissim. Praesent sed arcu diam. Fusce odio lorem, rhoncus id metus vitae, pellentesque porta mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam eget lacinia arcu. Aliquam erat volutpat.',
      date: date,
      id: null,
      dataRetorno,
    };

    return value;
  }

  getType(contraRef) {
    if (contraRef) return FichaContraReferencia;
    else return FichaReferencia;
  }

  getOptions(contrRef) {
    if (contrRef) {
      return {
        ...options,
        fields: {
          ...options.fields,
          NomeDoPaciente: { editable: false },
          unidadeOrigem: { editable: false },
          unidadeDestino: { editable: false },
          municipioOrigem: { editable: false },
        },
      };
    }
    return options;
  }

  onChange = (value) => {
    this.setState({ value });
  };

  handleNewSubmit = async (value) => {
    const db = firebase.firestore();
    db.collection('ref_contra_ref')
      .add(value)
      .then(function (docRef) {
        Alert.alert('Notificação', 'Caso cadastrado com sucesso!');
        navigation.goBack();

        // criar algo pra mandar a notificação pro hospital
      })
      .catch(function (error) {
        Alert.alert(
          'Notificação',
          'Erro ao cadastrar, tente novamente mais tarde!'
        );
        console.error(error);
      });
    this.props.navigation.state.params.onGoBack();
  };

  handleUpdateSubmit = async (value, doc) => {
    const db = firebase.firestore();
    db.collection('ref_contra_ref')
      .doc(doc)
      .update(value)
      .then(function (docRef) {
        Alert.alert('Notificação', 'Caso Atualizado com sucesso!');
        navigation.goBack();

        // criar algo pra mandar a notificação pro hospital
      })
      .catch(function (error) {
        Alert.alert(
          'Notificação',
          'Erro ao atualizar, tente novamente mais tarde!'
        );
        console.error(error);
      });
    this.props.navigation.state.params.onGoBack(value);
  };

  handleSubmit = async () => {
    //this.setState({ loading: true });
    const user = firebase.auth().currentUser;
    const dados = this._form.getValue();
    const { navigation } = this.props;
    if (dados != null) {
      const contrRef = this.state.value.contra_ref
        ? true
        : navigation.getParam('contraRef', false);
      const value = Object.assign(
        {},
        this.state.value,
        dados,
        { contra_ref: contrRef },
        { user: user.uid },
        { userName: user.displayName }
      );
      if (this.state.value.id) {
        await this.handleUpdateSubmit(value, this.state.value.id);
      } else {
        await this.handleNewSubmit(value);
      }
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {}

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Loading loading={this.state.loading} />
          <KeyboardAvoidingView
            style={styles.KeyboardAvoidingViewStyle}
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
            {this.state.value.id ? (
              <Text style={styles.text}>Atualizar</Text>
            ) : (
              <Text style={styles.text}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
