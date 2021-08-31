import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();

  const login = useCallback((uid, token, username, expirationDate) => {
    setToken(token);
    setUsername(username);
    setUserId(uid);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + (1000 * 60 * 60));

    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token, username, expiration: tokenExpirationDate.toISOString() })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.username);
    }
  }, [login])

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <Suspense fallback={<div className="center" ><LoadingSpinner /></div>} >
            <UserPlaces />
          </Suspense>
        </Route>
        <Route path="/places/new" exact>
          <Suspense fallback={<div className="center" ><LoadingSpinner /></div>} >
            <NewPlace />
          </Suspense>
        </Route>
        <Route path="/places/:placeId">
          <Suspense fallback={<div className="center" ><LoadingSpinner /></div>} >
            <UpdatePlace />
          </Suspense>
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <Suspense fallback={<div className="center" ><LoadingSpinner /></div>} >
            <UserPlaces />
          </Suspense>
        </Route>
        <Route path="/auth">
          <Suspense fallback={<div className="center" ><LoadingSpinner /></div>} >
            <Auth />
          </Suspense>
        </Route>
        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token,
      userId,
      username,
      login,
      logout
    }} >
      <Router data-test="router-container" >
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
