import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import itens from './object';
import Item from '../../components/Item';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../commons';

class LeishmanioseScreen extends Component {
  static navigationOptions = {
    title: 'Calazar',
    headerStyle: {
      backgroundColor: colors.mainColor,
    },
    headerTintColor: '#fff',
  };

  handleNavigation = ({ nextScreen, dados, title }) => {
    this.props.navigation.navigate(nextScreen, { dados: dados, title: title });
  };

  render() {
    return (
      <ScrollView style={estilo.container}>
        <View style={estilo.container}>
          <View style={estilo.content}>
            {itens.map((s) => {
              return (
                <Item
                  key={s.titulo}
                  showIcon={true}
                  icon="ios-bookmark"
                  iconColor={colors.secondaryColor}
                  onNavigate={this.handleNavigation}
                  style={{ margin: 0 }}
                  item={{ title: s.titulo, content: s.descricao }}
                ></Item>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 5,
  },
  info: {
    flex: 1,
  },
  descricao: {
    fontSize: 14,
    color: '#6C6C80',
    letterSpacing: 0.5,
  },
  card: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default LeishmanioseScreen;
