import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      disabledButton: true,
      loading: false,
      albums: [],
      artist: '',
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

  handleRequest = async () => {
    const { input } = this.state;
    this.setState({ loading: true });
    const search = await searchAlbumsAPI(input);
    this.setState({
      input: '',
      loading: false,
      albums: search,
      artist: input,
    });
  }

  render() {
    const { disabledButton, input, loading, albums, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
          value={ input }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabledButton }
          onClick={ this.handleRequest }
        >
          Procurar
        </button>
        {
          loading ? <Loading /> : (
            <section>
              {albums.length !== 0 ? (
                <div>
                  <p>{`Resultado de álbuns de: ${artist}`}</p>
                  <div>
                    {albums
                      .map(
                        ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                          <section key={ collectionId }>
                            <img src={ artworkUrl100 } alt={ collectionName } />
                            <h3>{ collectionName }</h3>
                            <p>{ artistName }</p>
                            <Link
                              to={ `album/${collectionId}` }
                              data-testid={ `link-to-album-${collectionId}` }
                            />
                          </section>
                        ),
                      )}
                    ;
                  </div>
                </div>
              ) : <p>Nenhum álbum foi encontrado</p>}
            </section>
          )
        }
      </div>

    );
  }
}

export default Search;
