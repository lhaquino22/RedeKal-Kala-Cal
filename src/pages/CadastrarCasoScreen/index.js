import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import estilo from './styles';
import firebase from '../../config/firebase'
import { ScrollView } from 'react-native-gesture-handler';
import t from 'tcomb-form-native';
import Geocoder from 'react-native-geocoding';
import { casos } from '../object';

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

export default class CadastrarCasoScreen extends Component {
  state = {
    value: {
      nome: "",
      endereco: "",
    }
  }

  cadastrar = () => {
    var form = this._form.getValue()
    var form = Object.assign({}, form);
    Geocoder.from(form.endereco)
      .then(json => {
        var location = json.results[0].geometry.location;
        var location_temp = {
          localizacao: {
            latitude: location.lat,
            longitude: location.lng
          } 
        }

        form = Object.assign({}, form, location_temp);
        console.log(form);
        casos.push(form);
        Alert.alert("Notificação", "Caso cadastrado com sucesso!");
      })
      .catch(error => alert("Não foi possível encontrar esse endereço."));
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