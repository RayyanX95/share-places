import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPage';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return <Router>
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Router path="/places/new" exact>
          <NewPlace />
        </Router>
      </Switch>
    </main>
    <Redirect to='/' />
  </Router>
}

export default App;
