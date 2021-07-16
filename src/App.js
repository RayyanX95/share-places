import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';



const App = () => {
  return <Router data-test="router-container" >
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Router path="/places/new" exact>
          <NewPlace />
        </Router>
        <Router path="/places/:placeID">
          <UpdatePlace />
        </Router>
      </Switch>
    </main>
    {/* <Redirect to='/' /> */}
  </Router>
}

export default App;
