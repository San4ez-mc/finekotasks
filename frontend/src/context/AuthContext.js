import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCsrfToken } from "../utils/csrf";

const AuthContext = createContext(null);

// async function getCsrfToken() {
//   const meta = document.querySelector('meta[name="csrf-token"]');
//   if (meta) {
//     return meta.getAttribute("content");
//   }
//   const match = document.cookie.match(/(^|;\s*)_csrf=([^;]+)/);
//   if (match) {
//     return decodeURIComponent(match[2]);
//   }
//   const res = await axios.get("https://tasks.fineko.space/api/auth/csrf", {
//     withCredentials: true,
//   });
//   return res.data.csrfToken;
// }

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const token = await getCsrfToken();
      const res = await axios.post(
        "https://tasks.fineko.space/api/auth/login",
        { username, password },
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": token || "" },
        }
      );
      if (res.data && res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return true;
      }
    } catch (e) {
      console.error("Login error", e);
    }
    return false;
  };

  const logout = async () => {
    try {
      const token = await getCsrfToken();
      await axios.post(
        "https://tasks.fineko.space/api/auth/logout",
        {},
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": token || "" },
        }

      );
    } catch (e) {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}
