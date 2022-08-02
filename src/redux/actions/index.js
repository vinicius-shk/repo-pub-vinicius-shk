export const USER = 'USER';
export const WALLET = 'WALLET';
export const COIN = 'COIN';
export const DELETE = 'DELETE';
export const SET_EDIT = 'SET_EDIT';

export const userAction = (payload) => ({
  type: USER,
  payload,
});

export const coinAction = (payload) => ({
  type: COIN,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET,
  payload,
});

export const deleteAction = (payload) => ({
  type: DELETE,
  payload,
});

export const setEditAction = (payload) => ({
  type: SET_EDIT,
  payload,
});

export const fetchAPI = (task) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    if (!task) {
      const iterableCoins = Object.keys(data).filter((coin) => coin !== 'USDT');
      dispatch(coinAction(iterableCoins));
    } else {
      const { value, description, currency, method, tag, id } = task;
      const payload = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: { ...data },
      };
      dispatch(walletAction(payload));
    }
  } catch (error) {
    console.log(error);
  }
};
