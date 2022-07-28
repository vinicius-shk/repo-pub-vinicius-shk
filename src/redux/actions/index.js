export const USER = 'USER';
export const WALLET = 'WALLET';

export const userAction = (payload) => ({
  type: USER,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET,
  payload,
});

export const fetchAPI = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const iterableCoins = Object.keys(data).filter((coin) => coin !== 'USDT');
    dispatch(walletAction(iterableCoins));
  } catch (error) {
    console.log(error);
  }
};
