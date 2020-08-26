import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import style from './styles';
import pontos from './object';
import FormComponent from '../../components/FormComponent';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MapView, { Marker, Callout } from 'react-native-maps';

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

  state = {
    isMapReady: false,
    pontos: pontos,
  };

  fitAllMarkers() {
    this.map.fitToCoordinates(
      this.state.pontos.map((p) => p),
      {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      }
    );
  }

  componentDidMount() {}
  onMapLayout = () => {
    this.fitAllMarkers();
    this.setState({ isMapReady: true });
  };

  render() {
    return (
      <View style={style.flex}>
        <MapView
          ref={(ref) => {
            this.map = ref;
          }}
          style={{ flex: 1 }}
          showsUserLocation
          showsPointsOfInterest
          onMapReady={this.onMapLayout}
          initialRegion={{
            latitude: -5.0881867,
            longitude: -42.8056137,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {this.state.isMapReady &&
            this.state.pontos.map((marker) => (
              <Marker
                key={marker.nome}
                coordinate={marker}
                title={marker.nome}
                description="Clique para ir traçar uma rota."
                pinColor="red"
              >
                <Callout
                  style={style.flex}
                  onPress={() => Linking.openURL(marker.address)}
                >
                  <View>
                    <Text style={style.markerTitle}>
                      {marker.nome}
                    </Text>
                    <Text>{marker.telefone}</Text>
                    <View style={style.cuidados}>
                      {marker.tipo.map((t) => {
                        return (
                          <View style={style.cuidado} key={marker.nome + t.cuidado}>
                            <Text style={style.textoCuiado}>{t.cuidado}</Text>
                          </View>
                        )
                      })}
                    </View>
                    <View style={style.markerButtonContainer}>
                      <Text style={style.markerButton}>Traçar rota</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
        <View style={style.menu}>
          <TouchableOpacity
            onPress={() => this.fitAllMarkers()}
            style={style.centerButton}
          >
            <Icon name="image-filter-center-focus" size={30} color="#00A198" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* render() {
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
}  */
