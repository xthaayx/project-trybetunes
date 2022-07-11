import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      capa: [],
      musics: [],
    };
  }

  componentDidMount() {
    this.handleMusic();
  }

  handleMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const [cap, ...music] = await getMusics(id);
    this.setState({
      capa: cap,
      musics: music,
    });
  }

  render() {
    const { musics, capa } = this.state;
    console.log(musics);
    return (
      <>
        <div data-testid="page-album">
          <Header />
        </div>
        <p data-testid="artist-name">{capa.artistName}</p>
        <p data-testid="album-name">{capa.collectionName}</p>
        <div>
          {musics.map((info) => (
            <MusicCard
              key={ info.trackId }
              trackId={ info.trackId }
              trackName={ info.trackName }
              src={ info.previewUrl }
            />
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
