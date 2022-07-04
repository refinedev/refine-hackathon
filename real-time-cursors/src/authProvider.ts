import { AuthProvider } from "@pankod/refine-core";

export const TOKEN_KEY = "username";

export const authProvider: AuthProvider = {
  login: async ({ username }) => {
    localStorage.setItem(TOKEN_KEY, username);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve({ username: token });
  },
};
