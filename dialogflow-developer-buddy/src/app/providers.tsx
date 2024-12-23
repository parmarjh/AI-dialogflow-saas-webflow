'use client';
import { SessionProvider } from 'next-auth/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Ensure we have a URL, fallback to localhost in development
  const baseUrl = process.env.NEXTAUTH_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  return (
    <SessionProvider 
      basePath={`${baseUrl}/api/auth`}
    >
      {children}
    </SessionProvider>
  );
}