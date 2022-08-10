import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
      check: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { id } = this.props;
    const response = await getMusics(id);
    this.setState({ loading: false, favorites: response });
  }

  handleChangeFavorite = async ({ target }) => {
    const { favorites } = this.state;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(favorites);
      this.setState({ check: true, loading: false }, getFavoriteSongs);
    } else {
      await removeSong(favorites);
      this.setState({ check: false, loading: false });
    }
  }

  render() {
    const { music, audio, id } = this.props;
    const { loading, check } = this.state;
    return (
      <ul>
        {loading ? <Loading /> : (
          <li>
            <p>{ music }</p>
            <audio data-testid="audio-component" src={ audio } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ id }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${id}` }
                id={ id }
                onChange={ this.handleChangeFavorite }
                checked={ check }
              />
            </label>
          </li>
        )}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default MusicCard;
