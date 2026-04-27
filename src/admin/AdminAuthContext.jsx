import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { requestJson } from "../lib/api";

const TOKEN_KEY = "eyecon-admin-token";
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      if (!token) {
        if (active) {
          setAdmin(null);
          setReady(true);
        }
        return;
      }

      try {
        const payload = await requestJson("/api/admin/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (active) {
          setAdmin(payload.data.admin);
        }
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        if (active) {
          setToken("");
          setAdmin(null);
        }
      } finally {
        if (active) {
          setReady(true);
        }
      }
    }

    loadAdmin();

    return () => {
      active = false;
    };
  }, [token]);

  const login = async ({ email, password }) => {
    const payload = await requestJson("/api/admin/auth/login", {
      body: JSON.stringify({ email, password }),
      method: "POST",
    });

    localStorage.setItem(TOKEN_KEY, payload.data.token);
    setToken(payload.data.token);
    setAdmin(payload.data.admin);

    return payload.data.admin;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAdmin(null);
  };

  const apiFetch = async (path, options = {}) => {
    return requestJson(path, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
  };

  const value = useMemo(
    () => ({
      admin,
      apiFetch,
      isAuthenticated: Boolean(token),
      login,
      logout,
      ready,
      token,
    }),
    [admin, ready, token],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider.");
  }

  return context;
}

