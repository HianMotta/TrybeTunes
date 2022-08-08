import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      disabledButton: true,
    };
  }

  handleInputLength = () => {
    const minLength = 2;
    const { input } = this.state;
    const verifyLength = input.length < minLength;
    this.setState({ disabledButton: verifyLength });
  }

  handleChange = ({ target }) => {
    this.setState({ input: target.value }, () => this.handleInputLength());
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabledButton }
        >
          Procurar

        </button>
      </div>
    );
  }
}

export default Search;
