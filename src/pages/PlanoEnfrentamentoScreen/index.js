import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

class PlanoEnfrentamentoScreen extends Component {
  static navigationOptions = {
    title: 'Plano de Enfrentamento',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleAbrirArquivo() {
    Linking.openURL('http://www.saude.pi.gov.br/uploads/warning_document/file/179/Plano_Estadual_das_Negligenciadas_Piau__2015_2018_para_LIVRETO.pdf');
  }

  render() {
    const introducao = `
    Este plano encontra-se inserido no Projeto Piauí Pilares de Crescimento e Inclusão Social do Governo do Estado do Piauí, efetivado por convênio com o Banco Mundial, em conjunto com as secretarias Estaduais de Planejamento, Educação, Desenvolvimento Rural, Meio Ambiente e Instituto de Terras do Piauí.

   Com ele, esperamos melhorar a resposta às doenças negligenciadas no Piauí, enfrentando os fatores de risco de adoecimento da população, detectando oportunamente as doenças e apoiando intervenções adequadas de prevenção, diagnóstico, tratamento e controle da tuberculose, hanseníase, doença de chagas, leishmaniose e geohelmintíases.`;

    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <ScrollView >
            <View style={[estilo.content]}>
              <Text style={estilo.descricao}>{introducao}</Text>
            </View>
            <TouchableHighlight style={estilo.button} onPress={this.handleAbrirArquivo}>
              <Text style={estilo.text}>Abrir Arquivo</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    justifyContent:'space-between'
  },
  descricao: {
    fontSize: 16,
    color: '#6C6C80',
    letterSpacing: 0.5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00A198',
    padding: 10,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default PlanoEnfrentamentoScreen;
