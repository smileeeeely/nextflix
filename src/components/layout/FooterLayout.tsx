'use client';

import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const FooterLayout = () => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const isIntroPage = pathname === '/'; // Intro 페이지 여부

  return isIntroPage ? null : <Footer />;
};

export default FooterLayout;
