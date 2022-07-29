import React from "react";
import { screen } from '@testing-library/dom'
import { cleanup } from "@testing-library/react/dist/pure";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App';
import WalletForm from "../components/WalletForm";


const initialState = {
  user: {
    email: 'teste@email.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [],
    editor: false,
    idToEdit: 0,
    loading: false,
  }
};

describe('Conjunto de testes do TrybeWallet', () => {
  beforeEach(cleanup)
  it('Deveria renderizar componenetes do path /carteira', async () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState });
    const valueLabel = await screen.findByLabelText('Valor:');
    const aboutLabel = await screen.findByLabelText('Descrição:');
    const currenciesSelect = await screen.findByTestId('currency-input');
    const methodesSelect = await screen.findByTestId('method-input');
    const tagsSelect = await screen.findByTestId('tag-input');
    const addButton = await screen.findByRole('button', { name: /adicionar despesa/i });
    expect(valueLabel).toBeInTheDocument();
    expect(aboutLabel).toBeInTheDocument();
    expect(currenciesSelect).toBeInTheDocument();
    expect(methodesSelect).toBeInTheDocument();
    expect(tagsSelect).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});