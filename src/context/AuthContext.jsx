import React, { createContext, useState, useEffect, useContext } from 'react';
    import { createClient } from '@supabase/supabase-js';
    import { useNavigate } from 'react-router-dom';

    const AuthContext = createContext();

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [session, setSession] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });

        return () => subscription?.unsubscribe();
      }, []);

      const login = async (email, password) => {
        setLoading(true);
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) {
            console.error('Error signing in:', error);
            return { error: error.message };
          }
          setSession(data.session);
          setUser(data.user);
          navigate('/');
          return { success: true };
        } catch (error) {
          console.error('Unexpected error during login:', error);
          return { error: 'An unexpected error occurred.' };
        } finally {
          setLoading(false);
        }
      };

      const logout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        navigate('/login');
        setLoading(false);
      };

      const value = {
        user,
        session,
        loading,
        login,
        logout,
        supabase
      };

      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      return useContext(AuthContext);
    };
