import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAction, setEditAction } from '../redux/actions';

class Table extends Component {
  handleClick = async ({ target: { id, name } }) => {
    const { deleteTask, setEditTask, wallet: { expenses } } = this.props;
    if (name === 'Editar') {
      await setEditTask(Number(id));
    }
    const newList = expenses.filter((expense) => expense.id !== Number(id));
    deleteTask(newList);
  }

  renderTable = () => {
    const { wallet: { expenses } } = this.props;
    const valuesExpenses = Object.values(expenses);
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
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  id={ id }
                  onClick={ this.handleClick }
                  name="Excluir"
                >
                  Excluir
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  id={ id }
                  onClick={ this.handleClick }
                  name="Editar"
                >
                  Editar
                </button>
              </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (task) => dispatch(deleteAction(task)),
  setEditTask: (id) => dispatch(setEditAction(id)),
});

Table.propTypes = {
  wallet: PropTypes.object,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
