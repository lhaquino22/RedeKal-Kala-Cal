import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import estilo from './styles';
import sedes from './object';
import FormComponent from '../../components/FormComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PontosCuidadoScreen extends Component {
  static navigationOptions = {
    title: 'Pontos de Cuidado',
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
          {sedes.map((s) => {
            return (
              <View style={estilo.content} key={s.sede}>
                <FormComponent titulo={s.sede}>
                  <View style={estilo.card}>
                    <MaterialCommunityIcons name="hospital-marker" size={60} color="salmon" style={estilo.icone} />
                    <View style={estilo.info}>
                      <Text style={estilo.tituloHospital} ellipsizeMode="tail" numberOfLines={2}>{s.hospital.nome}</Text>
                      <Text style={estilo.cnes}>CNES {s.hospital.cnes}</Text>
                      <Text>{s.hospital.telefone}</Text>
                      <Text>{s.hospital.endereco}</Text>
                      <View style={estilo.cuidados}>
                        {s.hospital.tipo.map((t) => {
                          return (
                            <View style={estilo.cuidado} key={s.sede + t.cuidado}>
                              <Text style={estilo.textoCuiado}>{t.cuidado}</Text>
                            </View>
                          )
                        })}
                      </View>
                    </View>
                  </View>
                </FormComponent>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}