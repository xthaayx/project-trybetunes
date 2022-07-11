import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      search: '',
      disabled: true,
      loading: false,
      listMusic: [],
    };
  }

  isButtonDisabled = () => {
    const { userName } = this.state;
    if (userName.length >= 2) {
      return this.setState({ disabled: false });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.isButtonDisabled();
    });
  };

  handleClick = async () => {
    const { userName } = this.state;
    this.setState({
      userName: '',
      search: userName,
      loading: true,
    });
    this.setState({ listMusic: await searchAlbumsAPI(userName),
      loading: false,
    });
  };

  render() {
    const { userName, disabled, loading, listMusic, search } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        {loading && <Loading />}
        <div>
          <input
            type="text"
            name="userName"
            data-testid="search-artist-input"
            value={ userName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        {listMusic.length === 0 ? (
          <p> Nenhum álbum foi encontrado </p>)
          : (
            <>
              <h3>
                {`Resultado de álbuns de: ${search}`}
              </h3>
              {listMusic.map((music, index) => (
                <Link
                  key={ index }
                  to={ `/album/${music.collectionId}` }
                  data-testid={ `link-to-album-${music.collectionId}` }
                >
                  <h3>
                    {music.collectionName}
                  </h3>
                </Link>

              ))}
            </>
          )}
      </>
    );
  }
}

export default Search;
