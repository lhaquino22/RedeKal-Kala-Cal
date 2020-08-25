import React, { Component } from 'react';
import { View, Text } from 'react-native';
import estilo from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class FormComponent extends Component {
  state = {
    isOpen: false,
    estiloChildren: {
      opacity: 0,
      height: 0,
      flex: 1
    }
  }

  componentDidMount = () => {
    var isOpen = this.props.isOpen;
  
    if (isOpen === undefined) {
      isOpen = true;
    }
    if (isOpen === true) {
      var estiloChildren = {
        opacity: 1,
        height: '100%',
        flex: 1
      }
      this.setState({ isOpen, estiloChildren })
    }
    else{
      this.setState({ isOpen })
    }
  }

  onChange = () => {
    var { isOpen, estiloChildren } = this.state;
    if (!isOpen) {
      estiloChildren = { height: '100%', opacity: 1, flex: 1 };
    }
    else {
      estiloChildren = { height: 0, opacity: 0, flex: 1 };
    }
    this.setState({ isOpen: !isOpen, estiloChildren });

  }

  render() {
    const { isOpen, estiloChildren } = this.state;
    const titulo = this.props.titulo;

    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <View></View>
          <Text style={estilo.titulo}>{titulo}</Text>
          <TouchableOpacity onPress={this.onChange}>
            <MaterialCommunityIcons name={isOpen ? 'arrow-up-drop-circle-outline' : 'arrow-down-drop-circle-outline'} size={20} color="darkslategray" />
          </TouchableOpacity>
        </View>
        <View style={estiloChildren} pointerEvents={!isOpen ? pointerEvents="none" : null}>
          {this.props.children}
        </View>
      </View>

    );
  }
}