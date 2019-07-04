import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import estilo from './styles';
import firebase from '../../config/firebase'
export default class ContaScreen extends Component {
  static navigationOptions = {
    title: 'Conta',
  };

  render() {
    return (
      <View style={estilo.button}>
        <TouchableOpacity  onPress={this._signOutFirebase} >
          <Text>Actually, sign me out :)</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _signOutFirebase = () => {
    firebase.auth().signOut().then(
      this._signOutAsync
    ).catch(function(error) {
      alert(error)
    });
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();  
    this.props.navigation.navigate('Auth');
  };
}