import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  loginValidation = () => {
    const { email, password } = this.state;
    const bronkenEmail = email.split('@');
    const secondHalf = bronkenEmail[1];
    const minLength = 6;
    const pwdValidation = password.length >= minLength;
    if (secondHalf === 'email.com' && pwdValidation) return false;
    return true;
  }

  renderLogin = () => {
    const { email, password } = this.state;
    const { storeEmail } = this.props;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            minLength={ 6 }
            placeholder="digite sua senha"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.loginValidation() }
            onClick={ () => storeEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  };

  render() {
    return this.renderLogin();
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeEmail: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  storeEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
