import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const ACCESS_TOKEN_KEY = "refine-access-token";
export const USER_KEY = "refine-user";

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
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(jwt_decode(accessToken)));

      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };

      return Promise.resolve();
    }

    return Promise.reject(new Error("username: admin, password: admin"));
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) {
      return Promise.reject();
    }

    const user = JSON.parse(userData);
    return Promise.resolve({
      ...user,
    });
  },
};

export { axios };
