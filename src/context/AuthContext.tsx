import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase-client';

export interface User {
  id: string;
  email: string;
  role: 'youth' | 'mentor' | 'admin';
  fullName?: string;
  profileCompleted?: boolean;
}

interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  userType?: 'mentor' | 'mentee';
  role?: 'youth' | 'mentor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  completeProfile: (profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userRole = session.user.user_metadata?.role || 'youth';
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: userRole,
          fullName: session.user.user_metadata?.full_name,
          profileCompleted: session.user.user_metadata?.profile_completed || false
        });
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userRole = session.user.user_metadata?.role || 'youth';
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: userRole,
            fullName: session.user.user_metadata?.full_name,
            profileCompleted: session.user.user_metadata?.profile_completed || false
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setIsSigningUp(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
            role: data.role || (data.userType === 'mentee' ? 'youth' : 'mentor')
          }
        }
      });
      if (error) throw error;
    } finally {
      setIsSigningUp(false);
    }
  };

  const signOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      setIsSigningOut(false);
    }
  };

  const completeProfile = async (profileData: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...profileData,
          profile_completed: true
        }
      });
      if (error) throw error;

      // Update local user state
      if (user) {
        setUser({ ...user, profileCompleted: true });
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isSigningIn,
      isSigningUp,
      isSigningOut,
      signIn,
      signUp,
      signOut,
      completeProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};