import { getUserByEmail } from '@/utils/supabaseUser';
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
  signIn: async (email) => {
    const userData = await getUserByEmail(email);
    if (!userData) return;
    set({ isSignedIn: true, user: { email, nickname: userData.nickname } }); //로그인 한 유저 정보 담음
  },
  logout: () => set({ isSignedIn: false, user: null }),
}));
