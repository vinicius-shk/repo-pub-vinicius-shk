import React from "react";
import { waitFor, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { renderWithRouterAndRedux } from "./helpers/renderWith";

import Wallet from "../pages/Wallet";
import mockData from "./helpers/mockData";


const initialState = {
  user: {
    email: 'teste@email.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [],
    editor: false,
    idToEdit: 0,
    loading: true,
  }
};

const loadingState = {
  user: {
    email: 'teste@email.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [],
    editor: false,
    idToEdit: 0,
    loading: true,
  }
};

const notLoadingState = {
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
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
    });
  it('Deveria renderizar componenetes do path /carteira', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
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
  it('Deveria renderizar componenetes da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const valueLabel = await screen.findByLabelText('Valor:');
    const aboutLabel = await screen.findByLabelText('Descrição:');
    const currenciesSelect = await screen.findByTestId('currency-input');
    const methodesSelect = await screen.findByTestId('method-input');
    const tagsSelect = await screen.findByTestId('tag-input');
    const addButton = await screen.findByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueLabel, '1');
    userEvent.type(aboutLabel, 'sobre mim');
    userEvent.selectOptions(currenciesSelect, 'EUR');
    userEvent.selectOptions(methodesSelect, 'Cartão de crédito');
    userEvent.selectOptions(tagsSelect, 'Lazer');
    userEvent.click(addButton);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all')
    const caption = await screen.findByText('Lista de despesas');
    const about = await screen.findByRole('cell', { name: /sobre mim/i });
    const tag = await screen.findByRole('cell', { name: /lazer/i });
    const method = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const value = await screen.findByRole('cell', { name: /1\.00/i });
    const currencyPair = await screen.findByRole('cell', { name: /euro\/real brasileiro/i });
    const rate = await screen.findAllByRole('cell', { name: /5\.13/i });
    const coinName = await screen.findByRole('cell', { name: 'Real' });
    const excludeBtn = screen.queryByRole('button', { name: /excluir/i });
    const editBtn = screen.queryByRole('button', { name: /editar/i });
    expect(caption).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currencyPair).toBeInTheDocument();
    expect(rate[0]).toBeInTheDocument();
    expect(rate[1]).toBeInTheDocument();
    expect(coinName).toBeInTheDocument();
    expect(excludeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
  });
  it('should render a loading screen', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
    await waitFor(() => expect(loadingElement).not.toBeInTheDocument());
    });
  // it('Deveria renderizar componenetes da tabela', async () => {
  //   renderWithRouterAndRedux(<Wallet />, { initialState });
  //   const valueLabel = await screen.findByLabelText('Valor:');
  //   const aboutLabel = await screen.findByLabelText('Descrição:');
  //   const currenciesSelect = await screen.findByTestId('currency-input');
  //   const methodesSelect = await screen.findByTestId('method-input');
  //   const tagsSelect = await screen.findByTestId('tag-input');
  //   const addButton = await screen.findByRole('button', { name: /adicionar despesa/i });
  //   userEvent.type(valueLabel, '1');
  //   userEvent.type(aboutLabel, 'sobre mim');
  //   userEvent.selectOptions(currenciesSelect, 'EUR');
  //   userEvent.selectOptions(methodesSelect, 'Cartão de crédito');
  //   userEvent.selectOptions(tagsSelect, 'Lazer');
  //   userEvent.click(addButton);
  //   userEvent.type(valueLabel, '1');
  //   userEvent.type(aboutLabel, 'sobre mim2');
  //   userEvent.selectOptions(currenciesSelect, 'USD');
  //   userEvent.selectOptions(methodesSelect, 'Cartão de débito');
  //   userEvent.selectOptions(tagsSelect, 'Saúde');
  //   userEvent.click(addButton);
  //   const trNumber = await screen.getAllByRole('row');
  //   console.log(trNumber);
  //   expect(trNumber.length).toBe(2);
  // });
});
