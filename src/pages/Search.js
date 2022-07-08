import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disabled: true,
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
    console.log(name);
    this.setState({ [name]: value }, () => {
      this.isButtonDisabled();
    });
  };

  render() {
    const { userName, disabled } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
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
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
