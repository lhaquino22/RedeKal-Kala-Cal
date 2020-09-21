import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

import EntrarScreen from './EntrarScreen';
import CadastrarScreen from './CadastrarScreen';
import MainNavigator from './MainNavigator';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
    //this.tryToAdd();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      this.registerForPushNotificationsAsync();
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  tryToAdd = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    var db = firebase.firestore();
    var user = {
      nome: 'gabriel Araujo G',
    };
    if (userToken == null) {
      userToken = 'sss';
    }
    const algo = db.collection('users').doc(userToken);
    algo
      .set(user)
      .then()
      .catch((error) => {});
  };

  registerForPushNotificationsAsync = async () => {
    const { existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    const user = firebase.auth().currentUser;
    const db = await firebase.firestore();
    db.collection('users')
      .doc(user.uid)
      .update({ expoToken: token })
      .then(function (docRef) {})
      .catch(function (error) {});
    
    //call the push notification
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator({
  Entrar: EntrarScreen,
  Cadastrar: CadastrarScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
