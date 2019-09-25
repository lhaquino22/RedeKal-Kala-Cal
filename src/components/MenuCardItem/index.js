import React, { Component } from 'react';
import { View, Image } from 'react-native';
import estilo from './styles';

export default class MenuCardItem extends Component {
	render() {
		const { image } = this.props;
		return (
			<View style={estilo.container}>
				<Image source={image} style={estilo.image} />
			</View>
		)
	}
}