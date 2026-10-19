import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, getToken, setToken, setUnauthorizedHandler } from "../attestation/api";

const AuthContext = createContext(null);

// Attestatsiya bo'limi uchun sessiya. Playbookning qolgan qismi loginsiz ishlayveradi.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(() => Boolean(getToken()));

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
    if (!getToken()) return;
    api
      .me()
      .then((d) => setUser(d.user))
      .catch((e) => {
        if (e.status === 401) logout();
      })
      .finally(() => setChecking(false));
  }, [logout]);

  async function login(loginName, password) {
    const d = await api.login(loginName, password);
    setToken(d.token);
    setUser(d.user);
    return d.user;
  }

  return (
    <AuthContext.Provider
      value={{ user, checking, isAdmin: user?.role === "admin", login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
