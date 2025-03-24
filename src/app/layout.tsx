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
        <main>{children}</main>
        <FooterLayout />
      </body>
    </html>
  );
}
