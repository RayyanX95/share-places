import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPage';
function App() {
  return <Router>
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Router path="/places/new" exact>
        <NewPlace />
      </Router>
    </Switch>

    <Redirect to='/' />
  </Router>
}

export default App;
