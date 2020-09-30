import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import MenuCardItem from '../../components/MenuCardItem';
import estilo from './styles';
import object from './object';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      // <View style={estilo.fill}>
      //   <Header />
      //   <View style={estilo.container}>

      //   </View>
      // </View>
      <View style={{ backgroundColor: '#fafafa', flex: 1 }}>
        <Header />
        <View style={estilo.pad}>
          {object.map((item, index) => {
            return (
              <View style={estilo.itemsRow} key={index}>
                <TouchableOpacity style={estilo.fill} onPress={() => navigate(item[0].screen)}>
                  <MenuCardItem image={item[0].image} />
                </TouchableOpacity>
                <TouchableOpacity style={estilo.fill} onPress={() => navigate(item[1].screen)}>
                  <MenuCardItem image={item[1].image} />
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}