import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itens = [
  {titulo: "Leishmaniose Visceral", icone: "ios-paper", screen: "Leishmaniose"}, 
  {titulo: "Linha de Cuidado ao paciente com Calazar", icone: "ios-git-pull-request", screen: "LinhaDeCuidado"},
  {titulo: "Georreferenciamento dos casos", icone: "md-pin", screen: "Georreferenciamento"},
  {titulo: "Plano de Enfrentamento e Controle das Doenças Negligenciada no Estado do Piauí", icone: "md-book", screen: "Home"},
  {titulo: "Pontos de Cuidado no Estado do Piauí", icone: "md-home", screen: "Home"}, 
  {titulo:"Sobre", icone:"md-information-circle", screen: "Home"}
]

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Leish LineCare',
    headerTintColor: '#40270D',
    headerTitleStyle: {
        fontSize: 20
    },
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
        <ScrollView>
            <View style={estilo.imagemCard}>
                <Image source={require('./logo.png')} style={estilo.imagem}/>
            </View> 
            <FlatList 
            data={itens}
            renderItem={
            ({item}) =>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.screen)}>
                    <View style={estilo.card}>
                        <Ionicons name={item.icone} size={30} color="#FD833B"/>
                        <Text style={estilo.cardItem}>{item.titulo}</Text>
                    </View>
                </TouchableOpacity>
            }
            keyExtractor={item => item.titulo}
            />
        </ScrollView>
    );
  }
}

const estilo = StyleSheet.create({
  card:{
      marginHorizontal:10,
      paddingHorizontal:10,
      borderBottomWidth:2,
      borderBottomColor:"#FD833B",
      paddingVertical:16,
      flexDirection:"row",
      alignItems:"center",
  },
  imagemCard:{
      paddingVertical: 20,
      alignItems:"center",
      alignContent:"center",
      justifyContent: 'center'
  },
  imagem:{
      width:200, 
      height:200
  },
  cardItem:{
      fontSize:14,
      marginLeft:12,
      fontWeight:"bold",
      textAlign:"left",
      color:"#40270D"
  }
})