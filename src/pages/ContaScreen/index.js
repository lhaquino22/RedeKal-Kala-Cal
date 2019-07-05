import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import estilo from './styles';
import firebase from '../../config/firebase'
export default class ContaScreen extends Component {
  static navigationOptions = {
    title: 'Conta',
  };

  render() {
    var user = firebase.auth().currentUser;
    var name, email;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
    }
    return (
      <View style={estilo.container}>
        <View style={estilo.info}>
          <View style={estilo.item}>
            <Text>Nome: </Text>
            <Text>{name}</Text>
          </View>
          <View style={estilo.item}>
            <Text>Email: </Text>
            <Text>{email}</Text>
          </View>
        </View>
        <TouchableOpacity style={estilo.button} onPress={this._signOutFirebase} >
          <Text>Sair :)</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _signOutFirebase = () => {
    firebase.auth().signOut().then(
      this._signOutAsync
    ).catch(function (error) {
      alert(error)
    });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}