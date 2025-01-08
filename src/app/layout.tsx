import type { Metadata } from "next";
import React from 'react';

import { Providers } from '@/app/provider';
import '@/styles/globals.css';
import '@/styles/reset.css';
import { Header } from '@/components/common/Header';
import { Container } from '@/components/common/Container';

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
          <Header />
          <Container>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
