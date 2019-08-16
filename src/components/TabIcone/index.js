import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import estilo from './styles';

export default class TabIcone extends Component {
	render() {
		const { name, badgeCount, color, size } = this.props;

		return (
			<View style={estilo.container}>
				<MaterialCommunityIcons name={name} size={size} color={color} />
			</View>
		);
	}
}