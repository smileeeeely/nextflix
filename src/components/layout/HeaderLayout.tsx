'use client';

import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

const HeaderLayout = () => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const isIntroPage = pathname === '/'; // Intro 페이지 여부

  return isIntroPage ? null : <Header />;
};

export default HeaderLayout;
