'use server';
import { supabase } from '@/utils/supabaseClient';
import { FieldValues } from 'react-hook-form';

export const signUpSupabase = async (value: FieldValues) => {
  try {
    await supabase.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: {
          nickname: value.nickname,
        },
      },
    });
    return true;
  } catch (error) {
    throw new Error('회원가입 실패');
  }
};
