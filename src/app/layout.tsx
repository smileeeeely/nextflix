import './globals.css';
import HeaderLayout from '@/components/layout/HeaderLayout';
import FooterLayout from '@/components/layout/FooterLayout';
import Provider from '@/app/Provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`antialiased`}>
        <HeaderLayout />
        <Provider>
          <main className='mx-auto max-w-[1200px]'>{children}</main>
        </Provider>
        <FooterLayout />
      </body>
    </html>
  );
}
