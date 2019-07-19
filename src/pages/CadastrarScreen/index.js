import React from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Picker, View } from 'react-native';
import { withFormik} from 'formik';
import * as Yup from 'yup';

import { SignUp } from './../../config/firebase';
import styles from './styles';
import 'firebase/firestore';


const showComponent = (props) => {
  if (props.values.categoria_profissional === "Demais Profissionais de Nível Superior") {
    return (
      <View style={styles.field}>
        <Text>Outra Categoria Profissional: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={''}
          onChangeText={(text) => props.setFieldValue('categoria_profissional_outro', text)}
        />
      </View>
    )
  }
}

const form = (props) => (
  <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      <View style={styles.field}>
        <Text>Categoria Profissional: </Text>
        <Picker
          selectedValue={props.values.tipo_usuario}
          style={styles.picker}
          onValueChange={(itemValue) =>
            props.setFieldValue('tipo_usuario', itemValue)
          }>
          <Picker.Item label="Profissional de Saúde" value="Profissional de Saúde" />
          <Picker.Item label="Gestor do Município " value="Gestor do Município" />
          <Picker.Item label="Coordenador da Atenção Básica" value="Coordenador da Atenção Básica" />
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Nome: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Nome Sobrenome'}
          onChangeText={(text) => props.setFieldValue('nome', text)}
        />
        {props.errors.nome && <Text style={styles.errorText}>{props.errors.nome}</Text>}
      </View>

      <View style={styles.field}>
      <Text>CPF: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'99900099900'}
          onChangeText={(text) => props.setFieldValue('cpf', text)}
        />
        {props.errors.cpf && <Text style={styles.errorText}>{props.errors.cpf}</Text>}
      </View>
      <View style={styles.field}>
      <Text>CNES de onde Trabalha: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'9999999'}
          onChangeText={(text) => props.setFieldValue('cnes', text)}
        />
        {props.errors.cnes && <Text style={styles.errorText}>{props.errors.cnes}</Text>}
      </View>
      <View style={styles.field}>
        <Text>CNS: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'99999'}
          onChangeText={(text) => props.setFieldValue('cns', text)}
        />
        {props.errors.cns && <Text style={styles.errorText}>{props.errors.cns}</Text>}
      </View>
      <View style={styles.field}>
        <Text>Cidade onde trabalha: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'AC'}
          onChangeText={(text) => props.setFieldValue('cidade', text)}
        />
        {props.errors.cidade && <Text style={styles.errorText}>{props.errors.cidade}</Text>}
      </View>
      <View style={styles.field}>
        <Text>Estado onde trabalha: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Cidade'}
          onChangeText={(text) => props.setFieldValue('estado', text)}
        />
        {props.errors.estado && <Text style={styles.errorText}>{props.errors.estado}</Text>}
      </View>
      <View style={styles.field}>
        <Text>Categoria Profissional: </Text>
        <Picker
          selectedValue={props.values.categoria_profissional}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            props.setFieldValue('categoria_profissional', itemValue)
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
        showComponent(props)
      }
      <View style={styles.field}>
        <Text>Nível de Escolaridade: </Text>
        <Picker
          selectedValue={props.values.nivel_escolaridade}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            props.setFieldValue('nivel_escolaridade', itemValue)
          }>
          <Picker.Item label="Nível Médio" value="Nível Médio" />
          <Picker.Item label="Nível Superior Completo" value="Nível Superior Completo" />
          <Picker.Item label="Especialista" value="Especialista" />
          <Picker.Item label="Mestrado" value="Mestrado" />
          <Picker.Item label="Doutorado" value="Doutorado" />
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Email: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => props.setFieldValue('email', text)}
          placeholder="email@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        {props.errors.email && <Text style={styles.errorText}>{props.errors.email}</Text>}
      </View>
      <View style={styles.field}>
        <Text>Senha: </Text>
        <TextInput
          style={styles.textInput}
          placeholder={'******'}
          secureTextEntry={true}
          onChangeText={(text) => props.setFieldValue('password', text)}
        />
        {props.errors.password && <Text style={styles.errorText}>{props.errors.password}</Text>}
      </View>
      <TouchableOpacity
        style={styles.buttom}
        onPress={props.handleSubmit}
      >
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);


export default withFormik({
  mapPropsToValues: () => ({ nivel_escolaridade: 'Nível Médio', categoria_profissional: 'Técnico em Enfermagem', tipo_usuario: 'Profissional de Saúde' }),
  validationSchema: Yup.object().shape({
    nome: Yup.string()
      .required('Preencha o campo com nome e sobrenome.'),
    cpf: Yup.string()
      .matches(/^[0-9]{11}$/, 'Preencha o campo com apenas os 11 digitos do CPF')
      .required("Preencha o campo do CPF."),
    cnes: Yup.string()
      .matches(/[0-9]$/, 'Preencha o campo com apenas números.'),
    cns: Yup.string()
      .matches(/[0-9]$/, 'Preencha o campo com apenas números.'),
    cidade: Yup.string()
      .required('Preencha o campo com a cidade onde trabalha.'),
    estado: Yup.string()
      .required('Preencha o campo com o estado onde trabalha.'),
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('Preencha o campo de e-mail.'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres.')
      .required('Preencha o campo de senha.'),
  }),
  handleSubmit: (values) => {
    console.log(values);
    SignUp(values);
  }
})(form);

