import './globals.css';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import AppLayout from '@/components/appLayout';
import useAuthListener from '@/hooks/useAuthListener';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthListener(); //로그인 상태 감지 훅

  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <HeaderLayout />
        <AppLayout>
          <main className='mx-auto max-w-[1200px]'>{children}</main>
        </AppLayout>
        <FooterLayout />
      </body>
    </html>
  );
}
