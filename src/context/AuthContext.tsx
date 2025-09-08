import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase-client';
import { createUserProfile, UserProfile } from '../services/profile-service';

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
        const userRole = session.user.user_metadata?.user_type === 'mentor' ? 'mentor' : 'youth';
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
          const userRole = session.user.user_metadata?.user_type === 'mentor' ? 'mentor' : 'youth';
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
      const { data: result, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
            profile_completed: false
          }
        }
      });
      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }
      console.log('Signup result:', result);
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
    if (!user) throw new Error('No user found');
    
    try {
      // Update user_information table with profile data
      const { error: updateError } = await supabase
        .from('user_information')
        .update({
          full_name: profileData.fullName,
          about: profileData.about || '',
          location: profileData.location || '',
          hometown: profileData.hometown,
          profile_picture: profileData.profilePicture,
          headline: profileData.headline,
          current_role: profileData.currentRole,
          current_company: profileData.currentCompany,
          industry: profileData.industry,
          years_of_experience: profileData.yearsOfExperience,
          field_of_study: profileData.fieldOfStudy,
          current_status: profileData.currentStatus,
          desired_industry: profileData.desiredIndustry,
          career_stage: profileData.careerStage,
          skills: profileData.skills || [],
          education: profileData.education || [],
          experience: profileData.experience || [],
          certifications: profileData.certifications || []
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Update auth metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          profile_completed: true
        }
      });
      if (error) throw error;

      // Update local user state
      setUser({ ...user, profileCompleted: true });
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