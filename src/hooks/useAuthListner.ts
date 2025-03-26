'use client';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 세션 만료/로그아웃 시 로그인 페이지로 이동
export const useAuthListner = () => {
  const router = useRouter();

  useEffect(() => {
    // 인증 상태 변화 감지
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // 로그아웃 / 사용자 정보 변경 / 세션 만료
      if (event === 'SIGNED_OUT' || event === 'USER_UPDATED' || !session) {
        console.log('세션 만료 또는 로그아웃 상태입니다.');
        localStorage.removeItem('auth_token');
        router.push('/sign-in');
      }
    });

    //컴포넌트 언마운트 시 클린업 함수
    return () => {
      authListener.subscription.unsubscribe(); //구독 해제
    };
  }, [router]);
  return null; //UI 렌더링 X
};
