import { createContext } from 'react';

//* they are just default values
export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  username: null,
  login: () => { },
  logout: () => { }
});