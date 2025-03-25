import './globals.css';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
