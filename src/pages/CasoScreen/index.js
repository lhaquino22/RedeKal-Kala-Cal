import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import estilo from './styles';
import * as firebase from "firebase";
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import Geocoder from 'react-native-geocoding';
import { bindActionCreators } from 'redux';
import { addCaso, delCaso } from '../../../CasoAction';
import { connect } from 'react-redux';
import moment from 'moment';

const ufs = {
  'AC': 'AC',
  'AL': 'AL',
  'AM': 'AM',
  'AP': 'AP',
  'BA': 'BA',
  'CE': 'CE',
  'DF': 'DF',
  'ES': 'ES',
  'GO': 'GO',
  'MA': 'MA',
  'MG': 'MG',
  'MS': 'MS',
  'MT': 'MT',
  'PA': 'PA',
  'PB': 'PB',
  'PE': 'PE',
  'PI': 'PI',
  'PR': 'PR',
  'RJ': 'RJ',
  'RN': 'RN',
  'RO': 'RO',
  'RR': 'RR',
  'RS': 'RS',
  'SC': 'SC',
  'SE': 'SE',
  'SP': 'SP',
  'TO': 'TO',
}

const Form = t.form.Form;

Geocoder.init("AIzaSyBC47xhzukLmW2WTgnsIhtTyJYYzqDbQKs", { language: "pt-br" });

const dados_pessoais = t.struct({
  nome: t.String,
  data_nascimento: t.Date,
  idade: t.String,
  sexo: t.enums({
    'M': 'Masculino',
    'F': 'Feminino',
    'I': 'Ignorado'
  }),
  gestante: t.enums({
    '1': '1º Trimestre',
    '2': '2º Trimestre',
    '3': '3º Trimestre',
    '4': 'Idade Gestacional Ignorada',
    '5': 'Não',
    '6': 'Não se aplica',
    '9': 'Ignorada'
  }),
  raca_cor: t.maybe(t.enums({
    '1': 'Branca',
    '2': 'Preta',
    '3': 'Amarela',
    '4': 'Parda',
    '5': 'Indígena',
    '6': 'Ignorada'
  })),
  escolaridade: t.maybe(t.enums({
    '0': 'Analfabeto',
    '1': '1ª a 4ª série incompleta do EF',
    '2': '4ª série completa do EF',
    '3': '5ª à 8ª série incompleta do EF',
    '4': 'Ensino Fundamental completo',
    '5': 'Ensino Médio incompleto',
    '6': 'Ensino Médio completo',
    '7': 'Educação Superior incompleta',
    '8': 'Educação Superior completa',
    '9': 'Ignorado',
    '10': 'Não se aplica'
  })),
  cartao_sus: t.maybe(t.String),
  nome_mae: t.maybe(t.String)
})

const dados_residenciais = t.struct({
  uf: t.enums(ufs),
  municipio: t.String,
  codigo_ibge: t.maybe(t.String),
  distrito: t.maybe(t.String),
  endereco: t.String,
  complemento: t.maybe(t.String),
  codigo: t.maybe(t.String),
  geo_campo1: t.maybe(t.String),
  geo_campo2: t.maybe(t.String),
  ponto_referencia: t.maybe(t.String),
  cep: t.maybe(t.String),
  telefone: t.maybe(t.String),
  zona: t.maybe(t.enums({
    '1': 'Urbana',
    '2': 'Rural',
    '3': 'Periurbana',
    '9': 'Ignorado'
  })),
  pais: t.String
})

const dados_gerais = t.struct({
  tipo_notificacao: t.String,
  agravo_doenca: t.String,
  codigo_cid10: t.String,
  data_notificacao: t.Date,
  uf_notificacao: t.enums(ufs),
  municipio_notificacao: t.String,
  codigo_ibge: t.String,
  data_primeiros_sintomas: t.Date,
})

const dados_antecedentes = t.struct({
  data_investigacao: t.Date,
  ocupacao: t.String
})

const dados_clinicos = t.struct({
  manifestacao_bool: t.enums({
    '1': 'Sim',
    '2': 'Não',
    '9': 'Ignorado'
  }),
  sintomas: t.String,
  co_hiv: t.enums({
    '1': 'Sim',
    '2': 'Não',
    '9': 'Ignorado'
  })
})

const dados_laboratorio = t.struct({
  diagnostico_parasit: t.enums({
    '1': 'Positivo',
    '2': 'Negativo',
    '3': 'Não realizado'
  }),
  diagnostico_imunol: t.enums({
    '1': 'Positivo',
    '2': 'Negativo',
    '3': 'Não Realizado'
  }),
  procedimento: t.enums({
    'IFI': 'IFI',
    'Outro': 'Outro'
  }),
  tipo_entrada: t.enums({
    '1': 'Caso Novo',
    '2': 'Recidiva',
    '3': 'Transferência',
    '9': 'Ignorado'
  })
})

const dados_tratamento = t.struct({
  data_tratamento: t.Date,
  droga_inicial: t.enums({
    '1': 'Antimonial Pentavalente',
    '2': 'Anfotericina b',
    '3': 'Pentamidina',
    '4': 'Anfotericina b lipossomal',
    '5': 'Outra',
    '6': 'Não utilizada'
  }),
  peso: t.Number,
  dose_prescrita: t.enums({
    '1': 'Maior ou igual a 10 e menor que 15',
    '2': 'Maior ou igual a 15 e menor que 20',
    '3': 'Maior ou igual a 20'
  }),
  num_ampolas: t.Number,
  drogra_falencia: t.enums({
    '1': 'Anfotericna b',
    '2': 'Anfotericina b lipossomal',
    '3': 'Outra',
    '4': 'Não se aplica'
  })
})

const dados_conclusao = t.struct({
  classificacao_final: t.enums({
    '1': 'Confirmado',
    '2': 'Descartado'
  }),
  criterio_confirmacao: t.enums({
    '1': 'Laboratorial',
    '2': 'Clínico-Epidemiológico'
  }),
  caso_autoctone: t.enums({
    '1': 'Sim',
    '2': 'Não',
    '3': 'Indeterminado'
  }),
  uf_conclusao: t.enums(ufs),
  pais_conclusao: t.String,
  municipio_conclusao: t.String,
  codigo_ibge_conclusao: t.String,
  distrito: t.String,
  bairro: t.String,
  doenca_relacionada: t.enums({
    '1': 'Sim',
    '2': 'Não',
    '9': 'Ignorado'
  }),
  evolucao_caso: t.enums({
    '1': 'Cura',
    '2': 'Abandono',
    '3': 'Óbito por LV',
    '4': 'Óbito por outras causas',
    '5': 'Transferência'
  }),
  data_obito: t.Date,
  data_encerramento: t.Date
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

const options_dados_pessoais = {
  fields: {
    data_nascimento: {
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    },
    raca_cor: {
      label: 'Raça/Cor'
    },
    cartao_sus: {
      label: 'Número do Cartão SUS',
      keyboardType: 'numeric'
    },
    nome_mae: {
      label: 'Nome da Mãe'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_residenciais = {
  fields: {
    uf: {
      label: 'UF'
    },
    municipio: {
      label: 'Município'
    },
    codigo_ibge: {
      label: 'Código IBGE',
      keyboardType: 'numeric'
    },
    endereco: {
      label: 'Endereço'
    },
    codigo: {
      label: 'Código',
      keyboardType: 'numeric'
    },
    geo_campo1: {
      label: 'Geo Campo 1'
    },
    geo_campo2: {
      label: 'Geo Campo 2'
    },
    ponto_referencia: {
      label: 'Ponto de Referência'
    },
    cep: {
      label: 'CEP',
      keyboardType: 'numeric'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_gerais = {
  fields: {
    tipo_notificacao: {
      label: 'Tipo de Notificação',
      editable: false
    },
    agravo_doenca: {
      label: 'Agravo/Doença',
      editable: false
    },
    codigo_cid10: {
      label: 'Código (CID10)',
      editable: false
    },
    data_notificacao: {
      label: 'Data de Notificação',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    },
    uf_notificacao: {
      label: 'UF de Notificação'
    },
    municipio_notificacao: {
      label: 'Município de Notificação'
    },
    codigo_ibge: {
      label: 'Código IBGE',
      keyboardType: 'numeric'
    },
    data_primeiros_sintomas: {
      label: 'Data dos primeiros sintomas',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_antecedentes = {
  fields: {
    data_investigacao: {
      label: 'Data de Investigação',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    },
    ocupacao: {
      label: 'Ocupação'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_clinicos = {
  fields: {
    manifestacao_bool: {
      label: 'Manifestações Clínicas (sinais e sintomas)'
    },
    co_hiv: {
      label: 'Co - Infecção HIV'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_laboratorio = {
  fields: {
    diagnostico_parasit: {
      label: 'Diagnóstico Parasitológico'
    },
    diagnostico_imunol: {
      label: 'Diagnóstico Imunológico'
    },
    tipo_entrada: {
      label: 'Tipo de Entrada'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_tratamento = {
  fields: {
    data_tratamento: {
      label: 'Início do Tratamento',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    },
    droga_inicial: {
      label: 'Droga Inicial Administrada'
    },
    peso: {
      label: 'Peso'
    },
    dose_prescrita: {
      label: 'Dose prescrita em mg/kg/dia Sb+5'
    },
    num_ampolas: {
      label: 'Nº Total de Ampolas Prescritas'
    },
    drogra_falencia: {
      label: 'Outra Droga Utilizada, na Falência do Tratamento Inicial'
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

const options_dados_conclusao = {
  fields: {
    classificacao_final: {
      label: 'Classificação Final'
    },
    criterio_confirmacao: {
      label: 'Critério de Confirmação'
    },
    caso_autoctone: {
      label: 'O caso é autóctone do município de residência?'
    },
    uf_conclusao: {
      label: 'UF'
    },
    pais_conclusao: {
      label: 'País'
    },
    municipio_conclusao: {
      label: 'Município'
    },
    codigo_ibge_conclusao: {
      label: 'Código IBGE'
    },
    doenca_relacionada: {
      label: 'Doença relacionada ao Trabalho'
    },
    evolucao_caso: {
      label: 'Evolução do Caso'
    },
    data_obito: {
      label: 'Data de Óbito',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    },
    data_encerramento: {
      label: 'Data de Encerramento',
      mode: 'date',
      config: {
        format: date => moment(date).format('DD/MM/YYYY')
      }
    }
  },
  i18n: {
    optional: '',
    required: '*'
  },
  stylesheet: stylesheet
}

class CasoScreen extends Component {
  state = {
    value_dados_residenciais: {
      uf: 'PI'
    },
    value_dados_gerais: {
      tipo_notificacao: '2',
      uf_notificacao: 'PI',
      agravo_doenca: 'Leishmaniose Visceral',
      codigo_cid10: 'B55.0'
    }
  }

  static navigationOptions = {
    title: 'Caso de Ocorrência',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount = () => {
    const index = this.props.navigation.getParam('index', 'None')
    const casos = this.props.casos.casos;

    if (index != 'None') {
      this.setState({ valor: casos[index] });
    }
  }

  cadastrar = () => {
    var form_pessoais = this._form_gerais.getValue();
    moment(this._form_gerais.data_notificacao).format('DD/MM/YYYY');
    // if (!form) {
    //   Alert.alert("Notificação", "Todos os campos devem ser preenchidos.");
    //   return;
    // }
    // var form = Object.assign({}, form);
    // var user = firebase.auth().currentUser;
    // var index = this.props.navigation.getParam('index', 'None');
    // var caso = this.props.casos.casos[index]
    // Geocoder.from(form.endereco)
    //   .then(json => {
    //     var location = json.results[0].geometry.location;
    //     var location_temp = {
    //       localizacao: {
    //         latitude: location.lat,
    //         longitude: location.lng
    //       }
    //     }

    //     form = Object.assign({}, form, location_temp, { user: user.uid });
    //     var db = firebase.firestore();

    //     if (index != 'None') {
    //       form = Object.assign({}, form, { id: caso.id });
    //       db.collection("fichas").doc(caso.id).update(form);
    //       this.props.delCaso(index);
    //       this.props.addCaso(form);
    //       this.setState({ valor: form });
    //       Alert.alert("Notificação", "Caso atualizado com sucesso!");
    //     }
    //     else {
    //       const props = this.props;
    //       db.collection("fichas").add(form).then(function (docRef) {
    //         form = Object.assign({}, form, { id: docRef.id });
    //         props.addCaso(form);
    //         props.navigation.goBack();
    //         Alert.alert("Notificação", "Caso cadastrado com sucesso!");
    //       })
    //     }
    //   })
  }

  render() {
    return (
      <View style={estilo.container}>
        <ScrollView>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Dados Pessoais</Text>
            </View>
            <Form
              ref={c => this._form_pessoais = c}
              type={dados_pessoais}
              options={options_dados_pessoais} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Dados Residenciais</Text>
            </View>
            <Form
              ref={c => this._form_residenciais = c}
              type={dados_residenciais}
              options={options_dados_residenciais} value={this.state.value_dados_residenciais} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Dados Gerais</Text>
            </View>
            <Form
              ref={c => this._form_gerais = c}
              type={dados_gerais}
              options={options_dados_gerais} value={this.state.value_dados_gerais} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Antecedentes Epidemológicos</Text>
            </View>
            <Form
              ref={c => this._form_antecedentes = c}
              type={dados_antecedentes}
              options={options_dados_antecedentes} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Dados Clínicos</Text>
            </View>
            <Form
              ref={c => this._form_clinicos = c}
              type={dados_clinicos}
              options={options_dados_clinicos} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Dados Laboratoriais</Text>
            </View>
            <Form
              ref={c => this._form_laboratorio = c}
              type={dados_laboratorio}
              options={options_dados_laboratorio} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Tratamento</Text>
            </View>
            <Form
              ref={c => this._form_laboratorio = c}
              type={dados_tratamento}
              options={options_dados_tratamento} />
          </View>
          <View style={estilo.content}>
            <View style={estilo.tituloSecaoContainer}>
              <Text style={estilo.tituloSecao}>Conclusão</Text>
            </View>
            <Form
              ref={c => this._form_laboratorio = c}
              type={dados_conclusao}
              options={options_dados_conclusao} />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={estilo.button}
          onPress={this.cadastrar}
        >
          <Text style={estilo.text}>Guardar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { casos } = state
  return { casos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addCaso, delCaso
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CasoScreen);