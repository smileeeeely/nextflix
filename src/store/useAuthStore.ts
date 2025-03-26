import { checkSession, getUserByEmail, logOutSupabase } from '@/services/signIn';
import { create } from 'zustand';

interface AuthState {
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string) => void;
  logout: () => void;
}

interface User {
  email: string;
  nickname: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  user: null,
  // 로그인 함수
  signIn: async (email: string) => {
    const userData = await getUserByEmail(email); //supabase에서 userData 가져오기
    if (!userData) return;
    set({ isSignedIn: true, user: { email, nickname: userData.nickname } }); //로그인 한 유저 정보 담음
  },
  // 로그아웃 함수
  logout: async () => {
    await logOutSupabase();
    localStorage.removeItem('auth_token'); //로그아웃 시 로컬스토리지 토큰 삭제
    set({ isSignedIn: false, user: null });
  },
  // 토근 유효 검증 함수
  checkAuth: async (email: string) => {
    const userData = await checkSession();

    if (userData) {
      set({ isSignedIn: true, user: { email, nickname: userData.nickname } }); //유효할 때 유저 정보
    } else {
      set({ isSignedIn: false, user: null }); //유효하지 않을 때 로그아웃
    }
  },
}));
