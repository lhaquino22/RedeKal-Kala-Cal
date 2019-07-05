import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase'
import 'firebase/firestore';

import EntrarScreen from './EntrarScreen'
import CadastrarScreen from './CadastrarScreen'
import MainNavigator from './MainNavigator'

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
    //this.tryToAdd();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  tryToAdd = async () =>{
    var userToken = await AsyncStorage.getItem('userToken');
    var db = firebase.firestore();
    var user = {
      nome: "gabriel Araujo" 
    }
    if(userToken== null){
      userToken = "ss"
    }
    await db.collection("users").doc(userToken).set(user).then().catch((error)=>{

    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}} >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator({ Entrar: EntrarScreen, Cadastrar: CadastrarScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));