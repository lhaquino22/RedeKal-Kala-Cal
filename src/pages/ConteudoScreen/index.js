import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Text from '../../components/Text';
import style from './style';

class ConteudoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Detalhes'),
      headerStyle: {
        backgroundColor: '#00A198',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    const { navigation } = this.props;
    const dados = navigation.getParam('dados', '');
    const title = navigation.getParam('title', '');
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.container}>
          <View style={style.content}>
            <Text style={style.text}>{dados}</Text>
            {title === 'Agente Etiológico' && (
              <View>
                <View style={style.extraInfo}>
                  <Text style={style.extraTitle}>Família</Text>
                  <View style={style.extraDescription}>
                    <Text style={style.extraDescriptionText}>
                      trypanosomatidae
                    </Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text style={style.extraTitle}>Gênero</Text>
                  <View style={style.extraDescription}>
                    <Text style={style.extraDescriptionText}>Leishmania</Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text
                    style={style.extraTitle}
                  >{`Complexo\nde espécies`}</Text>
                  <View style={style.extraDescription}>
                    <Text style={style.extraDescriptionText}>L. donovani</Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text style={style.extraTitle}>Espécies</Text>
                  <View style={style.extraDescription}>
                    <Text style={style.extraDescriptionText}>L. chagasi</Text>
                    <Text style={style.extraDescriptionText}>L. donovani</Text>
                    <Text style={style.extraDescriptionText}>L. infantum</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ConteudoScreen;
