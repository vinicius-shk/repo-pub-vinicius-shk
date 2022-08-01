import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  renderTable = () => {
    const { wallet: { expenses } } = this.props;
    const valuesExpenses = Object.values(expenses);
    console.log(expenses);
    return (
      <>
        { valuesExpenses
          .map(({ currency, exchangeRates, id, description, tag, method, value }) => (
            <tr key={ `${currency}-${id}` }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>
                {
                  (parseFloat(exchangeRates[currency].ask) * parseFloat(value)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>teste</td>
            </tr>
          )) }
      </>
    );
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <caption>Lista de despesas</caption>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length !== 0 && this.renderTable()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

Table.propTypes = {
  wallet: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
