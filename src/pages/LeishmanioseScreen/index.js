import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import itens from './object';
import Item from '../../components/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
class LeishmanioseScreen extends Component {
  static navigationOptions = {
    title: 'Leishmaniose Visceral',
    headerStyle: {
      backgroundColor: '#00A198',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handleNavigation = ({ nextScreen, dados, title }) => {
    this.props.navigation.navigate(nextScreen, { dados: dados, title: title });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={estilo.container}>
          <View style={estilo.content}>
            {itens.map((s) => {
              return (
                <Item
                  key={s.titulo}
                  showIcon={false}
                  icon="arrow-right"
                  iconColor="#00A189"
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
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    padding: 10,
    paddingBottom: 0,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
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
