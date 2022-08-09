import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
// import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      album: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const musicsArray = response
      .filter(({ kind }) => kind === 'song');
    this.setState({
      musics: [...musicsArray],
      artist: response[0].artistName,
      album: response[0].collectionName,
      loading: false,
    });
  }

  render() {
    const { musics, artist, album, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <section>
            <h3 data-testid="artist-name">{artist}</h3>
            <h4 data-testid="album-name">{album}</h4>
            {musics.map(({ trackName, previewUrl }) => (
              <MusicCard key={ trackName } music={ trackName } audio={ previewUrl } />
            ))}
          </section>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default Album;
