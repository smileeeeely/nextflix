// 'use client';
// import { SIGNIN } from '@/constants/pagePath';
// import { supabase } from '@/utils/supabaseClient';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// export const useAuthListner = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'SESSION_EXPIRED') {
//         console.log('세션 만료 또는 로그아웃 상태입니다.');
//         localStorage.removeItem('auth_token');
//         router.push(SIGNIN);
//       }
//     });

//     //컴포넌트 언마운트 시 클린업 함수
//     return () => {
//       !authListener.unsubscribe();
//     };
//   }, [router]);
// };
