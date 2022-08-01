import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    return total.toString().replace(/^0+/, '');
  }

  renderHeader = () => {
    const { email, expenses } = this.props;
    return (
      <header>
        <span
          data-testid="email-field"
        >
          { email }
        </span>
        <span
          data-testid="total-field"
        >
          { expenses.length === 0 ? '0.00' : this.totalValueBrl() }
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
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
