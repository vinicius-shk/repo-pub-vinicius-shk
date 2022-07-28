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
