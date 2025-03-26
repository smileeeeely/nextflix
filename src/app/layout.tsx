import './globals.css';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import { useAuthListner } from '@/hooks/useAuthListner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthListner(); //로그인 상태 감지 훅

  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <HeaderLayout />
        <main className='mx-auto max-w-[1200px]'>{children}</main>
        <FooterLayout />
      </body>
    </html>
  );
}
