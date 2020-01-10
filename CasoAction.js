export const getCasos = novos_casos => (
    {
      type: 'GET_CASOS',
      payload: novos_casos,
    }
);

export const addCaso = novo_caso => (
  {
    type: 'ADD_CASO',
    payload: novo_caso,
  }
);

export const delCaso = index => (
  {
    type: 'DEL_CASO',
    payload: index,
  }
);
