import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import MenuCardItem from '../../components/MenuCardItem';
import estilo from './styles';
import object from './object';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={estilo.fill}>
        <Header />
        <View style={estilo.container}>
          {object.map((item, index) => {
            return (
              <View style={estilo.itemsRow} key={index}>
                <TouchableOpacity style={estilo.fill} onPress={() => navigate('Georreferenciamento')}>
                  <MenuCardItem icone={item[0].icone} titulo={item[0].titulo} cor={item[0].cor} />
                </TouchableOpacity>
                <TouchableOpacity style={estilo.fill}>
                  <MenuCardItem icone={item[1].icone} titulo={item[1].titulo} cor={item[1].cor} />
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}