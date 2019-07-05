import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';

import firebase from './../../config/firebase'
import estilo from './styles';
import MainNavigator from '../MainNavigator'


export default class EntrarScreen extends Component {
  static navigationOptions = {
    title: 'Entrar',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }
  
  _signInAsync = async (user) => {
    const userToken = await user.user.getIdToken();
    await AsyncStorage.setItem('userToken',userToken);
    this.props.navigation.navigate('App');
  };

  SignIn = (email, password) => {
      firebase.auth().languageCode = 'pt';
      firebase.auth().signInWithEmailAndPassword(email, password).then( (user) =>{
        this._signInAsync(user)
      }
      ).catch(function(error) {
        alert(error)
      });
      
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={estilo.container} behavior="padding">
        <TextInput
          style={estilo.textInput}
          placeholder={'Email'}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={estilo.textInput}
          placeholder={'Senha'}
          secureTextEntry={true}
          onChangeText={(senha) => this.setState({ senha })}
        />
        <TouchableOpacity
          style={estilo.buttom}
          onPress={() => this.SignIn(this.state.email, this.state.senha)}>
          <Text>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={estilo.buttomCadastrar}
          onPress={() => navigate("Cadastrar")}
        >
          <Text style={estilo.text}>Cadastrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
};