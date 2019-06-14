import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itens = [
  {titulo: "Cadastro de paciente suspeito ou confirmado", screen: "Georreferenciamento"},
  {titulo: "Distribuição espacial", screen: "Georreferenciamento"}
]

export default class GeorreferenciamentoScreen extends Component {
  static navigationOptions = {
    title: 'Georreferenciamento dos Casos',
    headerTintColor: 'lightsalmon',
    headerTitleStyle: {
        fontSize: 20
    },
};

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <FlatList
          data={itens}
          renderItem={
            ({ item }) =>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.screen)}>
                <View style={estilo.card}>
                  <View style={estilo.identacao}>
                    <Text style={estilo.cardItem}>{item.titulo}</Text>
                  </View>
                  <Ionicons name='ios-arrow-forward' size={30} color="lightsalmon" />
                </View>
              </TouchableOpacity>

          }
          keyExtractor={item => item.titulo}
        />
      </View>
    )
  }
}

const estilo = StyleSheet.create({
  card:{
      marginHorizontal:10,
      backgroundColor:"white",
      borderBottomWidth:2,
      borderBottomColor:"#FD833B",
      paddingVertical:16,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
  },
  cardItem:{
      fontSize:14,
      fontWeight:"bold",
      textAlign:"left",
      color:"black"
  },
  identacao:{
      flex:1,
      flexWrap:'wrap'
  }
})