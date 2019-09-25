import React, { Component } from 'react';
import { View, Image, ImageBackground, StatusBar, AsyncStorage, Alert } from 'react-native'
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from './../../config/firebase'
import estilo from './styles';

export default class EntrarScreen extends Component {
  static navigationOptions = {
    header: null
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
    await AsyncStorage.setItem('userToken', userToken);
    this.props.navigation.navigate('App');
  };

  SignIn = (email, password) => {
    firebase.auth().languageCode = "pt_br";
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this._signInAsync(user)
    }
    ).catch(function (error) {
      Alert.alert("Autenticação", "Usuário ou senha incorretos.")
    });

  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding">
          <StatusBar barStyle="light-content" />
          <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={estilo.image}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <Image source={require('../../../assets/images/logo_vertical.png')}
                style={estilo.logo} />
              <View style={estilo.inputContainer}>
                <TextInput
                  style={estilo.textInput}
                  placeholder={'E-mail'}
                  onChangeText={(email) => this.setState({ email })}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordRef.focus()}
                  keyboardType="email-address"
                  blurOnSubmit={false}
                />
                <TextInput
                  style={estilo.textInput}
                  placeholder={'Senha'}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry={true}
                  onChangeText={(senha) => this.setState({ senha })}
                  ref={ref => this.passwordRef = ref}
                  returnKeyType="go"
                  onSubmitEditing={() => this.SignIn(this.state.email, this.state.senha)}
                />
              </View>
              <View style={estilo.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => this.SignIn(this.state.email, this.state.senha)}>
                  <Image source={require('../../../assets/images/login.png')}
                    style={estilo.buttons} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate("Cadastrar")}
                >
                  <Image source={require('../../../assets/images/cadastro.png')}
                    style={estilo.buttons} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
};