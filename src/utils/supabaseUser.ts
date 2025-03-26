import { supabase } from './supabaseClient';

export const getUserByEmail = async (email: string) => {
  //single(): 하나의 행만 가져옴 (select만 할 시 배열)
  const { data, error } = await supabase.from('users').select('nickname').eq('email', email).single();
  if (error) {
    console.error('유저 조회 실패', error.message);
    return null;
  }
  return data;
};
