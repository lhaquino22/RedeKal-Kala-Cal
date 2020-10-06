import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { colors} from '../../commons';

class ReferenciaInfoScreen extends Component {
  static navigationOptions = {
    title: 'Informação do Referenciamento',
    headerStyle: {
      backgroundColor: colors.mainColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    data: this.props.navigation.getParam('data', {}),
    refreshing: false,
    loading: false,
  };

  _updateData = (data) => {
    this.setState({ data });
    this.props.navigation.state.params.onGoBack();
  };

  handleCriarContraRef = async () => {
    this.props.navigation.navigate('CadastrarReferencia', {
      data: this.state.data,
      contraRef: true,
      title: this.state.data.contra_ref
        ? 'Editar Contra-referência'
        : 'Criar Contra-referência',
      onGoBack: this._updateData,
    });
  };

  handleEditar = async () => {
    this.props.navigation.navigate('CadastrarReferencia', {
      data: this.state.data,
      title: 'Atualizar Referência',
      onGoBack: this._updateData,
    });
  };

  render() {
    const {
      NomeDoPaciente,
      idade,
      hipoteseDiagnostica,
      historiaClinica,
      medico,
      municipioOrigem,
      sexo,
      unidadeDestino,
      unidadeOrigem,
      contra_ref,
      date,
      diagnostico,
      CondutaTerapeutica,
      sugestoes,
      dataRetorno,
      medicoRetorno,
    } = this.state.data;

    console.log(date);
    const date_text = date.seconds
      ? moment(moment(date.seconds * 1000).toDate()).format('DD/MM/YYYY')
      : moment(date).format('DD/MM/YYYY');
    console.log(date_text);
    const dataRetorno_text = dataRetorno.seconds
      ? moment(moment(dataRetorno.seconds * 1000).toDate()).format('DD/MM/YYYY')
      : moment(dataRetorno).format('DD/MM/YYYY');

    const d = [
      {
        title: NomeDoPaciente,
        description: '',
        size: 16,
      },
      {
        title: 'Idade: ',
        description: idade,
        row: true,
      },
      {
        title: 'Sexo: ',
        description: sexo,
        row: true,
      },
      {
        title: 'Município de Origem:',
        description: municipioOrigem,
      },
      {
        title: 'Médico: ',
        description: medico,
      },
      {
        title: 'Hipótese Diagnóstica: ',
        description: hipoteseDiagnostica,
      },
      {
        title: 'História Clínica: ',
        description: historiaClinica,
      },
      {
        title: 'Unidade de Origem: ',
        description: unidadeOrigem,
      },
      {
        title: 'Unidade de Destino: ',
        description: unidadeDestino,
      },
      {
        title: 'Data: ',
        description: date_text,
      },
    ];

    const data = !contra_ref
      ? d
      : [
          ...d,
          {
            title: 'Contra Referência',
            description: '',
            size: 16,
          },
          {
            title: 'Diagnóstico: ',
            description: diagnostico,
          },
          {
            title: 'Condutal terapêutica: ',
            description: CondutaTerapeutica,
          },
          {
            title: 'Sugestões: ',
            description: sugestoes,
          },
          {
            title: 'Data de retorno: ',
            description: dataRetorno_text,
          },
          {
            title: 'Médico Responsável pelo retorno: ',
            description: medicoRetorno,
          },
        ];

    return (
      <>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.content}>
              {data.map((item) => (
                <View
                  key={item.title}
                  style={
                    item.row ? styles.infoContainer : styles.infoContainer2
                  }
                >
                  <Text style={item.size ? styles.title : styles.property}>
                    {item.title}
                  </Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleCriarContraRef}
          >
            <Icon
              name="file-document-box-plus-outline"
              color="white"
              size={24}
            />
            <Text style={styles.buttonText}>Contra-referência</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleEditar}>
            <Icon name="file-document-edit-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Editar Informações</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default ReferenciaInfoScreen;
