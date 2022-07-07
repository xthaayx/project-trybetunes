import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      disabled: true,
      loading: false,
    };
  }

    isButtonDisabled = () => {
      const { userName } = this.state;
      if (userName.length > 2) {
        return this.setState({ disabled: false });
      }
    };

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => {
        this.isButtonDisabled();
      });
    };

    handleClick = () => {
      const { userName } = this.state;
      const { history } = this.props;
      this.setState({
        loading: true,
      }, async () => {
        await createUser({ name: userName });
        history.push('/search');
      });
    };

    render() {
      const { userName, disabled, loading } = this.state;
      return (
        <div data-testid="page-login">
          { loading && <Loading /> }
          Login
          <input
            type="text"
            name="userName"
            data-testid="login-name-input"
            value={ userName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.handleClick }

          >
            Entrar
          </button>
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
