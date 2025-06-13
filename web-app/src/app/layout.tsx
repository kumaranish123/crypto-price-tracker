import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata = {
  title: 'Crypto Price Tracker',
  description: 'Live prices of Solana tokens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}