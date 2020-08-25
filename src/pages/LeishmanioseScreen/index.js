import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import itens from './object';
import FormComponent from '../../components/FormComponent';
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

  render() {
    return (
      <View style={estilo.container}>
        <ScrollView>
          {itens.map((s) => {
            return (
              <View style={estilo.content} key={s.titulo}>
                <FormComponent titulo={s.titulo}>
                  <View style={estilo.card}>
                    <View style={estilo.info}>
                      <Text style={estilo.descricao}>{s.descricao}</Text>
                      {s.titulo === 'Agente Etiológico' && (
                        <View>
                          <View style={estilo.extraInfo}>
                            <Text style={estilo.extraTitle}>Família</Text>
                            <View style={estilo.extraDescription}>
                              <Text style={estilo.extraDescriptionText}>
                                trypanosomatidae
                              </Text>
                            </View>
                          </View>
                          <View style={estilo.extraInfo}>
                            <Text style={estilo.extraTitle}>Gênero</Text>
                            <View style={estilo.extraDescription}>
                              <Text style={estilo.extraDescriptionText}>
                                Leishmania
                              </Text>
                            </View>
                          </View>
                          <View style={estilo.extraInfo}>
                            <Text style={estilo.extraTitle}>
                              Complexo de espécies
                            </Text>
                            <View style={estilo.extraDescription}>
                              <Text style={estilo.extraDescriptionText}>
                                L. donovani
                              </Text>
                            </View>
                          </View>
                          <View style={estilo.extraInfo}>
                            <Text style={estilo.extraTitle}>Espécies</Text>
                            <View style={estilo.extraDescription}>
                              <Text style={estilo.extraDescriptionText}>
                                L. chagasi
                              </Text>
                              <Text style={estilo.extraDescriptionText}>
                                L. donovani
                              </Text>
                              <Text style={estilo.extraDescriptionText}>
                                L. infantum
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </FormComponent>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
  extraInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraTitle: {
    fontWeight: 'bold',
    color: '#6C6C80',
  },
  extraDescription: {
    backgroundColor: '#00A198',
    borderRadius: 5,
    padding: 16,
    maxWidth: 140,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  extraDescriptionText: {
    color: '#fff',
  },
});

export default LeishmanioseScreen;
