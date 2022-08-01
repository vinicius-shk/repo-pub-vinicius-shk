import { COIN, DELETE, WALLET } from '../actions';

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
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case DELETE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
