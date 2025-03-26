import './globals.css';
import HeaderLayout from '@/components/layout/HeaderLayout';
import FooterLayout from '@/components/layout/FooterLayout';
import Provider from '@/app/Provider';
import useAuthListener from '@/hooks/useAuthListener';

export const metadata = {
  title: 'NEXTFLIX',
  description: '당신이 찾는 영화는 모두 여기에',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useAuthListener(); //로그인 상태 감지 훅

  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <HeaderLayout />
        <Provider>
          <main className='mx-auto min-h-[calc(100vh-70px-145px)] max-w-[1200px]'>{children}</main>
        </Provider>
        <FooterLayout />
      </body>
    </html>
  );
}
