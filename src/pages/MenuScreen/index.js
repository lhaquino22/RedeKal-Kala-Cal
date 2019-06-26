import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import Header from '../../components/Header';
import MenuCardItem from '../../components/MenuCardItem';
import estilo from './styles';
import object from './object';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={estilo.fill}>
        <Header />
        <View style={estilo.container}>
          {object.map((item, index) => {
            return (
              <View style={estilo.itemsRow} key={index}>
                <TouchableHighlight style={estilo.fill}>
                  <MenuCardItem icone={item[0].icone} titulo={item[0].titulo} cor={item[0].cor} />
                </TouchableHighlight>
                <TouchableHighlight style={estilo.fill}>
                  <MenuCardItem icone={item[1].icone} titulo={item[1].titulo} cor={item[1].cor} />
                </TouchableHighlight>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}