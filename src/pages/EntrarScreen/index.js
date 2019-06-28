import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';
import estilo from './styles';

export default class EntrarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Email: '',
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={estilo.container} behavior="padding">
        <TextInput style={estilo.textInput} placeholder={'Email'} 
          onChangeText={(text) => this.setState({Email})}>
        </TextInput>
        <TextInput style={estilo.textInput} placeholder={'Senha'} secureTextEntry={true}></TextInput>
        <TouchableOpacity style={estilo.buttom}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}