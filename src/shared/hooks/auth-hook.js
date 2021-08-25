import { useState, useCallback, useEffect } from 'react';

let logoutTimer = 0;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, username, expirationDate) => {
    setToken(token);
    setUsername(username);
    setUserId(uid);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 30);
    setTokenExpirationDate(tokenExpirationDate);
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
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    }
    else {
      // if we have no TOKEN we need to clear the timer and this may happens if the user
      // clicked manually on logout button
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.username, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId, username };
}