import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import estilo from './styles';

export default class MenuCardItem extends Component {
	render() {
		const { icone, titulo, cor } = this.props;
		return (
			<View style={estilo.container}>
				<MaterialCommunityIcons name={icone} size={40} color={cor} />
				<Text style={estilo.texto}>{titulo}</Text>
			</View>
		)
	}
}