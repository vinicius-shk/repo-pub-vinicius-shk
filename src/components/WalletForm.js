import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchApiKeys } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { propsFetchAPI } = this.props;
    propsFetchAPI();
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  renderWalletForm = () => {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, propsFetchAPI } = this.props;
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
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }
        >
          { currencies
            .map((coin, index) => (
              <option key={ `${coin}-${index}` }>{coin}</option>))}
        </select>
        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Saúde</option>
          <option>Trabalho</option>
          <option>Transporte</option>
        </select>
        <button
          type="button"
          onClick={ () => {
            propsFetchAPI(this.state);
            this.setState((prevState) => ({
              id: prevState.id + 1,
              value: '',
              description: '',
            }));
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.props;
    return (loading ? <span>Loading...</span> : this.renderWalletForm());
  }
}

const mapDispatchToProps = (dispatch) => ({
  propsFetchAPI: (task = false) => dispatch(fetchApiKeys(task)),
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
