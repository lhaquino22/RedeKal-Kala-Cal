import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { colors } from '../../commons';

class PlanoEnfrentamentoScreen extends Component {
  static navigationOptions = {
    title: 'Plano de Enfrentamento e Controle de Doenças Negligenciadas',
    headerStyle: {
      backgroundColor: colors.mainColor,
    },
    headerTintColor: '#fff',
  };

  handleAbrirArquivo() {
    Linking.openURL('http://www.saude.pi.gov.br/uploads/warning_document/file/179/Plano_Estadual_das_Negligenciadas_Piau__2015_2018_para_LIVRETO.pdf');
  }

  render() {
    const introducao = `\tEste plano encontra-se inserido no Projeto Piauí Pilares de Crescimento e Inclusão Social do Governo do Estado do Piauí, efetivado por convênio com o Banco Mundial, em conjunto com as secretarias Estaduais de Planejamento, Educação, Desenvolvimento Rural, Meio Ambiente e Instituto de Terras do Piauí.\n\n\tCom ele, esperamos melhorar a resposta às doenças negligenciadas no Piauí, enfrentando os fatores de risco de adoecimento da população, detectando oportunamente as doenças e apoiando intervenções adequadas de prevenção, diagnóstico, tratamento e controle da tuberculose, hanseníase, doença de chagas, leishmaniose e geohelmintíases.`;

    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <ScrollView >
            <View>
              <Text style={estilo.descricao}>{introducao}</Text>
              <TouchableHighlight style={estilo.button} onPress={this.handleAbrirArquivo}>
                <Text style={estilo.text}>Abrir Arquivo</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  descricao: {
    fontSize: 16,
    color: colors.defaultTextColor,
    textAlign: 'justify'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    padding: 10,
    marginTop: 20
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PlanoEnfrentamentoScreen;
