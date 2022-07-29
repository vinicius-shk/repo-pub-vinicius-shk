import React from "react";
import { screen } from '@testing-library/dom'
import { cleanup } from "@testing-library/react/dist/pure";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

import { renderWithRouter, renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App';


describe('Conjunto de testes do TrybeWallet', () => {
  beforeEach(cleanup)
  it('Deveria renderizar os componentes nativos da tela Login', () => {
    renderWithRouterAndRedux(<App />);
    const emailLabel = screen.getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    expect(emailLabel).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /entrar/i, })
    expect(button).toBeInTheDocument();
  });

  it('Deveria habilitar o botão em login válido e levar para o path /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const button = screen.getByRole('button', { name: /entrar/i, })
    const passwordInput = screen.getByTestId('password-input');
    expect(button).toBeDisabled();
    userEvent.type(emailInput, 'v@email.com')
    userEvent.type(passwordInput, '123456')
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira')
  });
});