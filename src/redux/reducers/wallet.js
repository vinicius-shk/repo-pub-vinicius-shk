import { WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};

export default wallet;
