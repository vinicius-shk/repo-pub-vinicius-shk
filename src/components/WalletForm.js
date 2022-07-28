import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
    };
  }

  componentDidMount() {
    const { propsFetchAPI } = this.props;
    propsFetchAPI();
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  renderWalletForm = () => {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select data-testid="currency-input">
          { currencies
            .map((coin, index) => (
              <option key={ `${coin}-${index}` }>{coin}</option>))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Saúde</option>
          <option>Trabalho</option>
          <option>Transporte</option>
        </select>
      </form>
    );
  }

  render() {
    const { loading } = this.props;
    return (loading ? <span>Loading...</span> : this.renderWalletForm());
  }
}

const mapDispatchToProps = (dispatch) => ({
  propsFetchAPI: () => dispatch(fetchAPI()),
});

const mapStateToProps = ({ wallet: { currencies, loading } }) => ({
  currencies,
  loading,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  loading: PropTypes.bool,
  propsFetchAPI: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
