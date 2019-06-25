import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import estilo from './styles';

export default class IconWithBadge extends Component {
	render() {
		const { name, badgeCount, color, size } = this.props;

		return (
			<View style={estilo.container}>
				<MaterialCommunityIcons name={name} size={size} color={color} />
				{badgeCount > 0 && (
					<View style={estilo.badgeContainer}>
						<Text style={estilo.badgeText}>{badgeCount}</Text>
					</View>
				)}
			</View>
		);
	}
}