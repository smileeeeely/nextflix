'use server';
import { supabase } from '@/utils/supabaseClient';
import { FieldValues } from 'react-hook-form';

export const signUpSupabase = async (value: FieldValues) => {
  const { error } = await supabase.auth.signUp({
    email: value.email,
    password: value.password,
    options: {
      data: {
        nickname: value.nickname,
      },
    },
  });
  if (error) {
    console.log('error', error);
  }
  const result = error ? false : true;
  return result;
};
