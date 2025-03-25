import { create } from 'zustand';

interface AuthState {
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string) => void;
  logout: () => void;
}

type User = {
  email: string;
};

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  user: null,
  signIn: (email: string) => set({ isSignedIn: true, user: { email } }), // 로그인 한 유저 정보 담음 (nickname으로 변경?)
  logout: () => set({ isSignedIn: false, user: null }),
}));
