import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const { status, data } = await axios.post(
      "http://localhost:3000/auth/login",
      {
        username,
        password,
      }
    );

    if (status === 200) {
      const { accessToken } = data;
      localStorage.setItem(TOKEN_KEY, accessToken);

      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };

      return Promise.resolve();
    }

    return Promise.reject(new Error("username: admin, password: admin"));
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    try {
      await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve({
      id: 1,
    });
  },
};

export { axios };
