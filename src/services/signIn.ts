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

// 유저 정보 가져오기 (nickname 포함)
export const getUserByEmail = async (email: string) => {
  //single(): 하나의 행만 가져옴 (select만 할 시 배열)
  const { data, error } = await supabase.from('users').select('nickname').eq('email', email).single();
  if (error) {
    console.error('유저 조회 실패', error.message);
    return null;
  }
  return data;
};

// supabase 로그아웃 서버 액션
export const logOutSupabase = async () => {
  await supabase.auth.signOut();
};
