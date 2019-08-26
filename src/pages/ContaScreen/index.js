import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import estilo from './styles';
import firebase from '../../config/firebase'
export default class ContaScreen extends Component {
  static navigationOptions = {
    title: 'Conta',
  };

  constructor(props) {
    super(props);
    this.state = {
      itens = [
        {
          title: "Nome",
          info: "Gabriel Araújo Gonçalves",
          icon: "",
        },
        {
          title: "E-mail",
          info: "gabriel-araujo52@hotmail.com",
          icon: "",
        },
      ]
    };
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
        <View style={estilo.content}>
          <View style={estilo.item}>
            <View style={estilo.itemIcon}></View>
            <View style={estilo.itemInfo}>
              <Text style={estilo.itemText1}></Text>
              <Text style={estilo.itemText2}></Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={estilo.button}
          onPress={this._signOutFirebase}
        >
          <Text>Sair :)</Text>
        </TouchableOpacity>
      </View>
    );
  }
}