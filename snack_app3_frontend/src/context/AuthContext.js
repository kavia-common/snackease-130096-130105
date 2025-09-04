import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthCtx = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access current auth state and actions. */
  return useContext(AuthCtx);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provide auth state and actions backed by localStorage (placeholder for real backend). */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('snack_auth_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('snack_auth_user', JSON.stringify(user));
    else localStorage.removeItem('snack_auth_user');
  }, [user]);

  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    signIn: async (email, password) => {
      if (!email || !password) throw new Error('Email and password required');
      const fake = { id: 'u1', email };
      setUser(fake);
      return fake;
    },
    // PUBLIC_INTERFACE
    signUp: async (email, password) => {
      if (!email || !password) throw new Error('Email and password required');
      const fake = { id: 'u1', email };
      setUser(fake);
      return fake;
    },
    // PUBLIC_INTERFACE
    signOut: () => setUser(null)
  }), []);

  const value = useMemo(() => ({ user, ...actions }), [user, actions]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
