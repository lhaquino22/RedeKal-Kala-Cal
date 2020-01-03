import { combineReducers } from 'redux';

const INITIAL_STATE = {
  casos: []
};

const CasoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CASOS':
      var {
        casos
      } = state;

      casos = action.payload;

      var newState = { casos };

      return newState;
    case 'ADD_CASO':
      var {
        casos
      } = state;

      casos.push(action.payload);

      var newState = { casos };

      return newState;
    case 'DEL_CASO':
      var {
        casos
      } = state;

      casos.splice(action.payload, 1);

      var newState = { casos };

      return newState;
    default:
      return state
  }
};

export default combineReducers({
  casos: CasoReducer,
});