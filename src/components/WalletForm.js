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
    const { currencies, propsFetchAPI, editor, idToEdit } = this.props;
    return (
      <form className="container_walletform">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="text"
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
            type="text"
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
          className="loginBtn"
          onClick={ () => {
            if (editor) {
              const edit = {
                value,
                description,
                currency,
                method,
                tag,
                id: idToEdit,
              };
              propsFetchAPI(edit);
            } else {
              propsFetchAPI(this.state);
              this.setState((prevState) => ({
                id: prevState.id + 1,
                value: '',
                description: '',
              }));
            }
          } }
        >
          { !editor ? 'Adicionar despesa' : 'Editar despesa' }
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.props;
    return loading ? <span>Loading...</span> : this.renderWalletForm();
  }
}

const mapDispatchToProps = (dispatch) => ({
  propsFetchAPI: (task = false) => dispatch(fetchAPI(task)),
});

const mapStateToProps = ({ wallet: { currencies, loading, editor, idToEdit } }) => ({
  currencies,
  loading,
  editor,
  idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
  loading: PropTypes.bool,
  propsFetchAPI: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
