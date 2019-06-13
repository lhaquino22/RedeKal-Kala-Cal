import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itens = [
  {titulo: "Leishmaniose Visceral"}, 
  {titulo: "Linha de Cuidado ao paciente com Calazar"},
  {titulo: "Georreferenciamento dos casos"},
  {titulo: "Plano de Enfrentamento e Controle das Doenças Negligenciada no Estado do Piauí"},
  {titulo: "Pontos de Cuidado no Estado do Piauí"}, 
  {titulo:"Sobre", icone:"md-information-circle"}
]

export default class LeishmanioseVisceralScreen extends Component {
  static navigationOptions = {
    title: 'Leishmaniose Visceral',
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
  card: {
    marginHorizontal: 10,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "lightsalmon",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardItem: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    color: "black"
  },
  identacao: {
    flex: 1,
    flexWrap: 'wrap'
  }
})