import type { Metadata } from "next";
import React from 'react';

import { Providers } from '@/app/provider';
import '@/styles/globals.css';
import '@/styles/reset.css';

export const metadata: Metadata = {
  title: "Git Tiers",
  description: "Git Tiers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
