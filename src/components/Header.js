import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  renderHeader = () => {
    const { email } = this.props;
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
          0
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

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
