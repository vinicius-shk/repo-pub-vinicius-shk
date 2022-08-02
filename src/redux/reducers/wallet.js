import { COIN, DELETE, SET_EDIT, WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case COIN:
    return {
      ...state,
      currencies: action.payload,
      loading: false,
    };
  case WALLET:
    return {
      ...state,
      editor: false,
      expenses: [
        ...state.expenses,
        action.payload,
      ].sort((a, b) => {
        const falsy = -1;
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return falsy;
        }
        return 0;
      }),
    };
  case DELETE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case SET_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
