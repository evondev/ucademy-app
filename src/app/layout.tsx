import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@/shared/components/common';
import { UserProvider } from '@/shared/contexts';
import { ReactQueryContext } from '@/shared/contexts/react-query-context';

export const metadata: Metadata = {
  title: 'Ucademy',
  description: 'Nền tảng học lập trình trực tuyến siêu cấp vip pro',
};

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <ReactQueryContext>
              <UserProvider>
                <NuqsAdapter>{children}</NuqsAdapter>
              </UserProvider>
            </ReactQueryContext>
            <SpeedInsights />
            <Analytics />
            <ToastContainer
              autoClose={2000}
              bodyClassName="text-sm font-medium"
              position="top-right"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
