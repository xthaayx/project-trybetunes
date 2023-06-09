import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './components/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <p>TrybeTunes</p>
          <Switch>
            <Route
              path="/"
              exact
              component={ Login }
            />
            <Route
              path="/search"
              component={ Search }
            />
            <Route
              path="/album/:id"
              component={ Album }
            />
            <Route
              path="/favorites"
              component={ Favorites }
            />
            <Route
              path="/profile/edit"
              component={ ProfileEdit }
            />
            <Route
              path="/profile"
              component={ Profile }
            />
            <Route
              path="/*"
              component={ NotFound }
            />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
