import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleClick = async () => {
    const { musics } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(musics);
    this.setState({
      loading: false,
    });
    this.handleFavorite();
  };

  handleFavorite = async () => {
    const { musics } = this.props;
    this.setState({
      checked: true,
    });
    await getFavoriteSongs(musics);
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        <h3>
          {' '}
          { trackName }
        </h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="favorite"
        >
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleClick }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.objectOf.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
