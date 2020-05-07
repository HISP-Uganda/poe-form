const TOKEN_KEY = 'jwt';

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
}
