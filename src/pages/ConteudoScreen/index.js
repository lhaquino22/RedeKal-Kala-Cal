import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Text from '../../components/Text';
import { colors } from '../../commons';
import style from './style';

class ConteudoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Detalhes'),
      headerStyle: {
        backgroundColor: colors.mainColor,
      },
      headerTintColor: '#fff',
    };
  };

  render() {
    const { navigation } = this.props;
    const dados = navigation.getParam('dados', '');
    const title = navigation.getParam('title', '');
    
    return (
      <ScrollView style={style.container}>
          <View style={style.content}>
            <Text style={style.text}>{dados}</Text>
            {title === 'Agente Etiológico' && (
              <View>
                <View style={style.extraInfo}>
                  <Text style={[style.extraTitle, {flex: 1}]}>Família</Text>
                  <View style={[style.extraDescription, {marginLeft: 10}]}>
                    <Text style={style.extraDescriptionText}>trypanosomatidae</Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text style={[style.extraTitle, {flex: 1}]}>Gênero</Text>
                  <View style={[style.extraDescription, {marginLeft: 10}]}>
                    <Text style={style.extraDescriptionText}>Leishmania</Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text style={style.extraTitle}>Complexo de espécies</Text>
                  <View style={[style.extraDescription, {marginLeft: 10}]}>
                    <Text style={style.extraDescriptionText}>L. donovani</Text>
                  </View>
                </View>
                <View style={style.extraInfo}>
                  <Text style={style.extraTitle}>Espécies</Text>
                  <View style={[style.extraDescription, {marginLeft: 10}]}>
                    <Text style={style.extraDescriptionText}>L. chagasi</Text>
                    <Text style={style.extraDescriptionText}>L. donovani</Text>
                    <Text style={style.extraDescriptionText}>L. infantum</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
      </ScrollView>
    );
  }
}

export default ConteudoScreen;
