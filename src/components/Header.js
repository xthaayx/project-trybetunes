import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

   handleUser = async () => {
     this.setState({
       loading: true,
     });
     const user = await getUser();
     this.setState({
       userName: user.name,
       loading: false,
     });
   }

   render() {
     const { userName, loading } = this.state;
     return (
       <header data-testid="header-component">
         { loading ? <Loading />
           : (
             <div>
               <h1 data-testid="header-user-name">
                 { userName }
               </h1>
               <BrowserRouter>
                 <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                 <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                 <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
               </BrowserRouter>
             </div>)}
       </header>
     );
   }
}

export default Header;
