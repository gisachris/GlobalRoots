import { supabase } from '../lib/supabase-client';

export interface UserProfile {
  id?: string;
  user_id: string;
  full_name: string;
  about: string;
  location: string;
  hometown?: string;
  profile_picture?: string;
  headline?: string;
  current_role?: string;
  current_company?: string;
  industry?: string;
  years_of_experience?: number;
  field_of_study?: string;
  current_status?: string;
  desired_industry?: string;
  career_stage?: string;
  skills: string[];
  education: any[];
  experience: any[];
  certifications?: any[];
}

export const createUserProfile = async (profileData: Omit<UserProfile, 'id'>): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('user_information')
    .insert([profileData])
    .select()
    .single();

  if (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }

  return data;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_information')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No profile found
    }
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }

  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('user_information')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }

  return data;
};