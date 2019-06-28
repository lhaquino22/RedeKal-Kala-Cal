import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import estilo from './styles';

export default class CadastrarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Nome: '',
      CPF: '',
      CNES: '',
      CNS: '',
      Cidade: '',
      Estado: '',
      Categoria_profissional: '',
      Nivel_escolaridade: '',
      Email: '',
    };
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      <ScrollView style={estilo.container}>
        <TextInput style={estilo.textInput} placeholder={'Nome'} 
          onChangeText={(text) => this.setState({Nome: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'CPF'} 
          onChangeText={(text) => this.setState({CPF: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'CNES do estabelecimento'} 
          onChangeText={(text) => this.setState({CNES: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'CNS'} 
          onChangeText={(text) => this.setState({CNS: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Cidade onde trabalha'} 
          onChangeText={(text) => this.setState({Cidade: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Estado onde trabalha'} 
          onChangeText={(text) => this.setState({Estado: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Categoria profissional'} 
          onChangeText={(text) => this.setState({Categoria_profissional: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Nível de escolaridade'} 
          onChangeText={(text) => this.setState({Nivel_escolaridade: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Email'} 
          onChangeText={(text) => this.setState({Email: text})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Senha'} secureTextEntry={true}></TextInput>
        <TouchableOpacity style={estilo.buttom}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}