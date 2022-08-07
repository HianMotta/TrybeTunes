import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      disabledButton: true,
      loading: false,
    };
  }

  handleInputLength = () => {
    const { nameInput } = this.state;
    const minLength = 3;
    if (nameInput.length >= minLength) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  handleNameInput = ({ target }) => {
    this.setState({ nameInput: target.value }, () => this.handleInputLength());
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const { nameInput } = this.state;
    const { history } = this.props;
    await createUser({ name: nameInput });
    history.push('./search');
  }

  render() {
    const {
      nameInput,
      disabledButton,
      loading,
    } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <div>
            <label htmlFor="login-name-input">
              Nome
              <input
                type="text"
                data-testid="login-name-input"
                name={ nameInput }
                onChange={ this.handleNameInput }
              />
            </label>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ disabledButton }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        )}
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
