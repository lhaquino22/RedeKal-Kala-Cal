import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import firebase from './../../config/firebase'
import estilo from './styles';

export default class CadastrarScreen extends Component {
  static navigationOptions = {
    title: 'Cadastrar',
  };
  constructor(props) {
    super(props);
    this.state = { 
      nome: '',
      cpf: '',
      cnes: '',
      cns: '',
      cidade: '',
      estado: '',
      categoria_profissional: '',
      nivel_escolaridade: '',
      email: '',
      senha: '',
    };
  }

  SignUp = (email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      <ScrollView style={estilo.container}>
        <TextInput 
          style={estilo.textInput}
          placeholder={'Nome'} 
          onChangeText={(text) => this.setState({nome: text})}
        />
        <TextInput 
          style={estilo.textInput}
          placeholder={'CPF'} 
          onChangeText={(text) => this.setState({cpf: text})}
        />
        <TextInput 
          style={estilo.textInput} 
          placeholder={'CNES do estabelecimento'} 
          onChangeText={(text) => this.setState({cnes: text})}
        />
        <TextInput 
          style={estilo.textInput} 
          placeholder={'CNS'} 
          onChangeText={(text) => this.setState({cns: text})}
        />
        <TextInput 
          style={estilo.textInput} 
          placeholder={'Email'} 
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput 
          style={estilo.textInput} 
          placeholder={'Senha'} 
          secureTextEntry={true}
          onChangeText={(text) => this.setState({senha: text})}
        />
        <TouchableOpacity 
        style={estilo.buttom}
        onPress={() => this.SignUp(this.state.email, this.state.senha)}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}