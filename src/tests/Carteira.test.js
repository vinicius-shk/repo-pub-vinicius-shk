import React from "react";
import { screen } from '@testing-library/dom'
import { cleanup } from "@testing-library/react/dist/pure";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

import { renderWithRouterAndRedux } from "./helpers/renderWith";
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
  it('Deveria renderizar componenetes do path /carteira', async () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState });
    const valueLabel = await screen.findByLabelText('Valor:');
    const aboutLabel = await screen.findByLabelText('Descrição:');
    const currenciesSelect = await screen.findByTestId('currency-input');
    const methodesSelect = await screen.findByTestId('method-input');
    const tagsSelect = await screen.findByTestId('tag-input');
    const addButton = await screen.findByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueLabel, '10');
    userEvent.type(aboutLabel, 'sobre mim');
    userEvent.selectOptions(currenciesSelect, 'EUR');
    userEvent.selectOptions(methodesSelect, 'Cartão de crédito');
    userEvent.selectOptions(tagsSelect, 'Lazer');
    userEvent.click(addButton);
    const caption = screen.queryByText('Lista de despesas');
    const about = screen.getByRole('cell', { name: /sobre mim/i });
    const tag = screen.getByRole('cell', { name: /lazer/i });
    const method = screen.getByRole('cell', { name: /cartão de crédito/i })
    const value = screen.getByRole('cell', { name: /10\.00/i });
    const currency = screen.getByRole('cell', { name: /euro\/real brasileiro/i });
    const rate = screen.getByRole('cell', { name: /5\.36/i });
    const brlValue = screen.getByRole('cell', { name: /53\.61/i });
    const coinName = screen.getByRole('cell', { name: /real/i });
    const excludeBtn = screen.getByRole('button', { name: /excluir/i });
    const editBtn = screen.getByRole('button', { name: /editar/i });
    expect(caption).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(rate).toBeInTheDocument();
    expect(brlValue).toBeInTheDocument();
    expect(coinName).toBeInTheDocument();
    expect(excludeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
  });
});