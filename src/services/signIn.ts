'use server';

import { supabase } from '@/utils/supabaseClient';

export interface SignInProps {
  email: string;
  password: string;
}

// supabase 로그인 서버 액션
export const signInSupabase = async ({ email, password }: SignInProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
