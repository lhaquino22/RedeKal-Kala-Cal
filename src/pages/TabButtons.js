import React, { Component } from 'react';
import { View, Image } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default class TabButtons extends Component {
  render() {
    const nome = this.props.nome;

    return (
      <View>
        <MaterialCommunityIcons size={32} color='gray' name={nome}/>
      </View>
    );
  }
}