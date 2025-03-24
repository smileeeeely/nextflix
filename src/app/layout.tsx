'use client'; // 클라이언트 컴포넌트로 변경

import { usePathname } from 'next/navigation';
import './globals.css';
import Header from '@/components/commons/Header';
import Footer from '@/components/commons/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname(); // 현재 경로 가져오기
  const isIntroPage = pathName === '/'; // Intro 페이지 여부

  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        {!isIntroPage && <Header />}
        <main>{children}</main>
        {!isIntroPage && <Footer />}
      </body>
    </html>
  );
}
