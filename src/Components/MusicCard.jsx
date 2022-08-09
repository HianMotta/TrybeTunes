import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, audio } = this.props;
    return (
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

      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
};

export default MusicCard;
