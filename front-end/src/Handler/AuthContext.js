import { createContext } from 'react';

const AuthContext = createContext({
  isLogin: false,
  userId: null,
  userName: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;