import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from './icontrybe.jpg';

class Header extends Component {
  totalValueBrl = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { currency, value, exchangeRates } = expense;
      const coinData = Object.values(exchangeRates)
        .find((coin) => currency === coin.code);
      total += Number((parseFloat(coinData.ask) * parseFloat(value)).toFixed(2));
    });
    // Regex retirado do StackOverflow para retirada de zeros a esquerda.
    return total.toString().replace(/^0+/, '');
  }

  renderHeader = () => {
    const { email, expenses } = this.props;
    return (
      <header>
        <span
          data-testid="email-field"
        >
          Email:
          { ' ' }
          { email }
        </span>
        <div className="logoContainer">
          <img src={ logo } alt="Trybe icon" className="headerLogo" />
          <span>TrybeWallet</span>
        </div>
        <div>
          <span
            data-testid="total-field"
          >
            Total:
            { ' ' }
            { expenses.length === 0 ? '0.00' : this.totalValueBrl() }
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </div>
      </header>
    );
  }

  render() {
    return this.renderHeader();
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
