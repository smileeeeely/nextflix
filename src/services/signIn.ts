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
  const { data, error } = await supabase.from('users').select('id, email, nickname').eq('email', email).single();
  console.log('data', data);
  if (error) {
    console.error('유저 정보 조회 실패', error.message);
    return null;
  }
  return data;
};

// supabase 로그아웃 서버 액션
export const logOutSupabase = async () => {
  await supabase.auth.signOut();
};

// supabase 세션 확인 서버 액션
export const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    const email = data.session.user.email;
    const { data: userData, error } = await supabase.from('users').select('email').eq('email', email).single();

    if (error) {
      console.log('유저 조회 실패', error.message);
      return null;
    }
    return userData; //data가 있다면 userData
  }
  return null; //세션이 없다면 null
};
