import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Picker, View } from 'react-native';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { SignUp } from './../../config/firebase';
import estilo from './styles';
import 'firebase/firestore';

export default class CadastrarScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View style={estilo.container}>
        <Text>Bom dia</Text>
      </View>
    )
  }
}

