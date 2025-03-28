'use client';
import useAuthListener from '@/hooks/useAuthListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  useAuthListener(); //로그인 상태 관리 훅
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Provider;
