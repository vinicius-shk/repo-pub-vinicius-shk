import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  renderTable = () => {
    const { wallet } = this.props;
    console.log(wallet);
    return (
      <table>
        <caption>Lista de despesas</caption>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </table>
    );
  }

  render() {
    return this.renderTable();
  }
}

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

Table.propTypes = {
  wallet: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
