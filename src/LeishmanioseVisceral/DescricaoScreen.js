import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itens = [ 
  {titulo: "Reservatório", screen: "Descricao"},
  {titulo: "Vetor", screen: "Descricao"},
  {titulo: "Modo de Transmissão", screen: "Descricao"},
  {titulo: "Sintomas", screen: "Descricao"}, 
  {titulo:"Perfil Epidemiológico", screen: "Descricao"}
]

export default class DescricaoScreen extends Component {
  static navigationOptions = {
    title: 'Descrição',
    headerTintColor: 'lightsalmon',
    headerTitleStyle: {
        fontSize: 20
    },
};

  render() {
    return (
      <View>
        <FlatList
          data={itens}
          renderItem={
            ({ item }) =>
              <TouchableOpacity>
                <View style={estilo.card}>
                  <View style={estilo.identacao}>
                    <Text style={estilo.cardItem}>{item.titulo}</Text>
                  </View>
                  <Ionicons name='ios-arrow-forward' size={30} color="lightcoral" />
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
      borderBottomColor:"lightcoral",
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