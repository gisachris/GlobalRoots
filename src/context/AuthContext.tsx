import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { supabase } from '../lib/supabase-client';
import type { User, Session } from '@supabase/supabase-js';

// Define the shape of a user profile row
export interface UserProfile {
    id: string;
    full_name: string | null;
    user_type: 'mentor' | 'mentee';
    email: string | null;
    created_at: string;
    updated_at: string;
}

// Define AuthContext value shape
interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    authLoading: boolean;
    signUp: (args: {
        fullName: string;
        email: string;
        password: string;
        userType?: 'mentor' | 'mentee';
    }) => Promise<{ data: any; error: Error | null }>;
    signIn: (args: {
        email: string;
        password: string;
    }) => Promise<{ data: any; error: Error | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ data: any; error: Error | null }>;
    updatePassword: (password: string) => Promise<{ data: any; error: Error | null }>;
    fetchProfile: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            const {
                data: { session },
            }: { data: { session: Session | null } } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            }
            setLoading(false);
        };
        getSession();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from<UserProfile>('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            setProfile(data);
        } catch (error: any) {
            console.error('Error fetching profile:', error.message);
        }
    };

    const signUp: AuthContextType['signUp'] = async ({
        fullName,
        email,
        password,
        userType = 'mentee',
    }) => {
        setAuthLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        user_type: userType,
                    },
                },
            });
            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        } finally {
            setAuthLoading(false);
        }
    };

    const signIn: AuthContextType['signIn'] = async ({ email, password }) => {
        setAuthLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        } finally {
            setAuthLoading(false);
        }
    };

    const signOut: AuthContextType['signOut'] = async () => {
        setAuthLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error: any) {
            console.error('Error signing out:', error.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const resetPassword: AuthContextType['resetPassword'] = async (email) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    };

    const updatePassword: AuthContextType['updatePassword'] = async (password) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password,
            });
            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    };

    const value: AuthContextType = {
        user,
        profile,
        loading,
        authLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        fetchProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
