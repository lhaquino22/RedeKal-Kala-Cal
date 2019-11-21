import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import estilo from './styles';
import * as firebase from "firebase";
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import Geocoder from 'react-native-geocoding';
import { bindActionCreators } from 'redux';
import { addCaso } from '../../../CasoAction';
import { connect } from 'react-redux';

const Form = t.form.Form;
Geocoder.init("AIzaSyBC47xhzukLmW2WTgnsIhtTyJYYzqDbQKs", { language: "pt-br" });

const User = t.struct({
  nome: t.String,
  endereco: t.String,
  caso_confirmado: t.Boolean
})

var _ = require('lodash');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.normal.fontSize = 16;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.controlLabel.normal.fontSize = 14;
stylesheet.controlLabel.normal.color = 'gray';

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.normal.fontSize = 4;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.normal.borderBottomColor = '#00A198';
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

const options = {
  fields: {
    endereco: {
      label: "Endereço"
    },
    tipo_caso: {
      label: "Caso Confirmado"
    }
  },
  stylesheet: stylesheet
}

class CadastrarCasoScreen extends Component {
  state = {
    value: {
      nome: "",
      endereco: "",
    }
  }

  cadastrar = () => {
    var form = this._form.getValue()
    var form = Object.assign({}, form);
    var user = firebase.auth().currentUser;

    Geocoder.from(form.endereco)
      .then(json => {
        var location = json.results[0].geometry.location;
        var location_temp = {
          localizacao: {
            latitude: location.lat,
            longitude: location.lng
          }
        }

        var db = firebase.firestore();
        form = Object.assign({}, form, location_temp, {user: user.uid});
        db.collection("fichas").add(form);
        this.props.addCaso(form);
        Alert.alert("Notificação", "Caso cadastrado com sucesso!");
      })
      .catch(error => alert(error));
  }

  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.content}>
          <ScrollView>
            <Form
              ref={c => this._form = c}
              type={User} value={this.state.value}
              options={options} />
          </ScrollView>

        </View>
        <TouchableOpacity
          style={estilo.button}
          onPress={this.cadastrar}
        >
          <Text style={estilo.text}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { casos } = state
  return { casos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addCaso,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarCasoScreen);