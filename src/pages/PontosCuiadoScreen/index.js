import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from './styles';
import sedes from './object';
import FormComponent from '../../components/FormComponent';
import Icon from '@expo/vector-icons/Ionicons';
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
    pontos: [
      {
        title: 'Hospital Getúlio Vargas',
        address:
          'https://maps.apple.com/?address=Avenida%20Frei%20Serafim,%202352,%20Frei%20Serafim,%20Teresina%20-%20PI,%2064001-020,%20Brasil&auid=17141066225949766545&ll=-5.088160,-42.804236&lsp=9902&q=Hospital%20Get%C3%BAlio%20Vargas&_ext=ChgKBAgEEBkKBAgFEAMKBAgGEAoKBAgKEAASJimm6TZq214UwDH6ovKIhGdFwDm4PQiJqFUUwEGYD64CXWZFwFAE',
        latitude: -5.0879589,
        longitude: -42.8064774,
      },
      {
        title: 'Hospital Universitário',
        address:
          'https://maps.apple.com/?address=Avenida%20Universit%C3%A1ria,%20s/n,%20Teresina%20-%20PI,%2064049-550,%20Brasil&auid=6923384544532513127&ll=-5.056678,-42.790722&lsp=9902&q=Hospital%20Universit%C3%A1rio%20da%20Ufpi&_ext=ChgKBAgEEBkKBAgFEAMKBAgGEBkKBAgKEAASJilBM0MYUD4UwDFev2jX02VFwDlThxQ3HTUUwEGEsN1UrGRFwFAE',
        latitude: -5.0616178,
        longitude: -42.7960489,
      },
      {
        title: 'Hospital Lineu Araújo',
        address:
          'https://maps.apple.com/?address=Rua%20Magalh%C3%A3es%20Filho,%20152,%20Frei%20Serafim,%20Teresina%20-%20PI,%2064001-350,%20Brasil&auid=17737244257423423924&ll=-5.089811,-42.806640&lsp=9902&q=Hospital%20Lineu%20Ara%C3%BAjo&_ext=ChkKBAgEEBkKBAgFEAMKBQgGEN8BCgQIChAAEiQp4jzVmYdgFMAxwXFxvdFnRcA59JCmuFRXFMBBBbP7NqpmRcA%3D',
        latitude: -5.0898259,
        longitude: -42.8091008,
      },
      {
        title: 'Hospital São Marcos',
        address:
          'https://maps.apple.com/?address=Rua%20Olavo%20Bilac,%202300,%20Frei%20Serafim,%20Teresina%20-%20PI,%2064015-017,%20Brasil&auid=6573506152195298546&ll=-5.090640,-42.802775&lsp=9902&q=Hospital%20S%C3%A3o%20Marcos&_ext=ChgKBAgEEBkKBAgFEAMKBAgGEAoKBAgKEAASJin4V8jUaWEUwDFXOA3wWGdFwDkKrJnzNlgUwEF7fX1pMWZFwFAE',
        latitude: -5.090639,
        longitude: -42.8050807,
      },
    ],
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

  componentDidMount() {
    this.fitAllMarkers();
  }

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
          initialRegion={{
            latitude: this.state.pontos[0].latitude,
            longitude: this.state.pontos[0].longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {this.state.pontos.map((marker) => (
            <Marker
              coordinate={marker}
              title={marker.title}
              description="Clique para ir traçar uma rota."
              pinColor="#fff"
            >
              <Callout
                style={style.flex}
                onPress={() => Linking.openURL(marker.address)}
              >
                <View>
                  <Text style={style.markerTitle}>{marker.title}</Text>
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
            <Icon name="scan-circle" size={60} color="#FFF" />
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
