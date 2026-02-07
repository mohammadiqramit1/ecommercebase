import { Inter } from 'next/font/google';
import { Toaster } from './components/ui/sooner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LUXE - Premium Shopping Experience',
  description: 'Discover premium products curated for the modern lifestyle at LUXE.',
};

export default function RootLayout({ children } : {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
