import React, { Component } from 'react';
import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

import estilo from './styles';

export default class Loading extends Component {
  render() {
    const { loading } = this.props;

    return (
      <Modal
        transparent={true}
        animationType='none'
        visible={loading}>
        <View style={estilo.modalBackground}>
          <View style={estilo.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading} />
          </View>
        </View>
      </Modal>
    )
  }
}