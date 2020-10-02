//import React from 'react';
import t from 'tcomb-form-native';
import { colors } from '../../commons';
var _ = require('lodash');

export const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

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
stylesheet.textboxView.normal.borderBottomColor = colors.mainColor;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

const Form = t.form.Form;

var Escolaridade = t.enums(
  {
    'Ens. Fundamental Incompleto': 'Ens. Fundamental Incompleto',
    'Ens. Fundamental Completo': 'Ens. Fundamental Completo',
    'Ens. Médio Incompleto': 'Ens. Médio Incompleto',
    'Ens. Médio Completo': 'Ens. Médio Completo',
    'Ens. Superior Incompleto': 'Ens. Superior Incompleto',
    'Ens. Superior Completo': 'Ens. Superior Completo',
    'Especialização Incompleta': 'Especialização Incompleta',
    'Especialização Completa': 'Especialização Completa',
    'Mestrado Incompleto': 'Mestrado Incompleto',
    'Mestrado Completo': 'Mestrado Completo',
    'Doutorado Incompleto': 'Doutorado Incompleto',
  },
  'Escolaridade'
);

var Perfil = t.enums({
  'Profissional de Saúde': 'Profissional de Saúde',
  'Gestor do Município': 'Gestor do Município',
  'Gestor Hospitalar': 'Gestor Hospitalar',
});

var LocalTrabalho = t.enums({
  'Unidade Básica de Saúde': 'Unidade Básica de Saúde',
  Hospital: 'Hospital',
  'Secretaria Municipal de Saúde - Coordenação':
    'Secretaria Municipal de Saúde - Coordenação',
  Outro: 'Outro',
});

const Hospital = t.enums({
  'Hosp. Reg. Manoel de Sousa Santos': 'Hosp. Reg. Manoel de Sousa Santos',
  'Hosp. Reg. de Campo Maior': 'Hosp. Reg. de Campo Maior',
  'Hosp. Local Tibério Nunes': 'Hosp. Local Tibério Nunes',
  'Hosp. Reg. Deolindo Couto': 'Hosp. Reg. Deolindo Couto',
  'Hosp. Est. Dirceu Arcoverde': 'Hosp. Est. Dirceu Arcoverde',
  'Hosp. Reg. Justino Luz': 'Hosp. Reg. Justino Luz',
  'Hosp. Reg. Chagas Rodrigues': 'Hosp. Reg. Chagas Rodrigues',
  'Hosp. Reg. Sen. João Candido Ferraz': 'Hosp. Reg. Sen. João Candido Ferraz',
  'Inst. de Doenças Tropicais Natan Portela': 'Inst. de Doenças Tropicais Natan Portela',
  'Hosp. Reg. Sen. Dirceu Arcoverde': 'Hosp. Reg. Sen. Dirceu Arcoverde',
  'Hosp. Reg. Eustaqui Portela': 'Hosp. Reg. Eustaqui Portela',
});

const Email = t.refinement(t.String, (email) => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Senha = t.refinement(t.String, (senha) => {
  return senha.length >= 6;
});

export let Default = {
  perfil_acesso: Perfil,
  nome: t.String,
  cpf: t.Number,
  escolaridade: Escolaridade,
  categoria_profissional: t.String,
  estado: t.enums({}),
  cidade: t.enums({}),
};

export let Credenciais = {
  email: Email,
  password: Senha,
};

export const ProfissionalSaude = {
  local_trabalho: LocalTrabalho,
  outro: t.maybe(t.String),
};

export const GestorMunicipio = {
  local_trabalho: t.String,
};

export const GestorHospitalar = {
  hospital: Hospital,
};

export const options = {
  fields: {
    password: {
      label: 'Senha',
      error: 'A senha deve conter pelo menos 6 caracterers.',
      password: true,
      secureTextEntry: true,
    },
    perfil_acesso: {
      label: 'Perfil de acesso',
    },
    categoria_profissional: {
      label: 'Categoria Profissional',
    },
    escolaridade: {
      label: 'Nível de Escolaridade',
    },
    cns: {
      label: 'CNS',
    },
    cnes: {
      label: 'CNES',
    },
    cpf: {
      label: 'CPF',
    },
    email: {
      error: 'Insira um email válido.',
    },
    local_trabalho: {
      label: 'Local de trabalho',
    },
    hospital: {
      label: 'Hospital',
    },
    outro: {
      label: 'Outro',
      editable: false,
    },
  },
  stylesheet: stylesheet,
};

export default Form;
