'use server';

import { supabase } from '@/utils/supabaseClient';

export interface SignInProps {
  email: string;
  password: string;
}

export const setSupabaseSignIn = async ({ email, password }: SignInProps) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
};
