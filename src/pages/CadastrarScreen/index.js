import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Picker, View } from 'react-native';

import firebase from './../../config/firebase'
import estilo from './styles';
import 'firebase/firestore';

export default class CadastrarScreen extends Component {
  static navigationOptions = {
    title: 'Cadastrar',
  };
  constructor(props) {
    super(props);
    this.state = {
      tipo_usuario: 'Profissional de Saúde',
      nome: '',
      cpf: '',
      cnes: '',
      cns: '',
      cidade: '',
      estado: '',
      categoria_profissional: 'Técnico em Enfermagem',
      categoria_profissional_outro: '',
      nivel_escolaridade: 'Nível Médio',
      email: '',
      senha: '',
    };
  }

  SalvarDados(userId) {
    var db = firebase.firestore();
    db.collection("users").doc(userId).set(this.state).then().catch();
  }

  SignUp = async (email, password) => {

    await firebase.auth().createUserWithEmailAndPassword(email, password).then((auth) => {
      var user = firebase.auth().currentUser;
      this.SalvarDados(user.uid);
      user.updateProfile({
        displayName: this.state.nome,
      }).then(function () {
        alert("Cadastro criado com sucesso!")
      }).catch(function (error) {
        alert("Erro ao criar perfil!")
      });
    }).catch((error) => {
      alert(error)
    });
  }
  showComponent = () =>{
    if (this.state.categoria_profissional === "Demais Profissionais de Nível Superior"){
      return (
        <TextInput
            style={estilo.textInput}
            placeholder={'Outra Categoria Profissional'}
            onChangeText={(text) => this.setState({ categoria_profissional_outro: text })}
        />
      )
    }
    
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <ScrollView style={estilo.container}>
        <View style={estilo.picker}>
            <Text>Categoria Profissional: </Text>
            <Picker
              selectedValue={this.state.tipo_usuario}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ tipo_usuario: itemValue })
              }>
              <Picker.Item label="Profissional de Saúde" value="Profissional de Saúde" />
              <Picker.Item label="Gestor do Município " value="Gestor do Município" />
              <Picker.Item label="Coordenador da Atenção Básica" value="Coordenador da Atenção Básica" />
            </Picker>
          </View>
          <TextInput
            style={estilo.textInput}
            placeholder={'Nome'}
            onChangeText={(text) => this.setState({ nome: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'CPF'}
            onChangeText={(text) => this.setState({ cpf: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'CNES de onde Trabalha'}
            onChangeText={(text) => this.setState({ cnes: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'CNS'}
            onChangeText={(text) => this.setState({ cns: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'Cidade onde trabalha'}
            onChangeText={(text) => this.setState({ cidade: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'Estado onde trabalha'}
            onChangeText={(text) => this.setState({ estado: text })}
          />
          <View style={estilo.picker}>
            <Text>Categoria Profissional: </Text>
            <Picker
              selectedValue={this.state.categoria_profissional}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ categoria_profissional: itemValue })
              }>
              <Picker.Item label="Técnico em Enfermagem" value="Técnico em Enfermagem" />
              <Picker.Item label="Agente comunitário de saúde" value="Agente comunitário de saúde" />
              <Picker.Item label="Agente de Endemias" value="Agente de Endemias" />
              <Picker.Item label="Enfermeiro" value="Enfermeiro" />
              <Picker.Item label="Médico" value="Médico" />
              <Picker.Item label="Demais Profissionais de Nível Superior" value="Demais Profissionais de Nível Superior" />
            </Picker>
          </View>
          {
            this.showComponent()
          }
          <View style={estilo.picker}>
            <Text>Nível de Escolaridade: </Text>
            <Picker
              selectedValue={this.state.categoria_profissional}
              style={{ flex:1 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ nivel_escolaridade: itemValue })
              }>
              <Picker.Item label="Nível Médio" value="Nível Médio" />
              <Picker.Item label="Nível Superior Completo" value="Nível Superior Completo" />
              <Picker.Item label="Especialista" value="Especialista" />
              <Picker.Item label="Mestrado" value="Mestrado" />
              <Picker.Item label="Doutorado" value="Doutorado" />
            </Picker>
          </View>
          <TextInput
            style={estilo.textInput}
            placeholder={'Email'}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={estilo.textInput}
            placeholder={'Senha'}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ senha: text })}
          />
          <TouchableOpacity
            style={estilo.buttom}
            onPress={() => this.SignUp(this.state.email, this.state.senha)}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}