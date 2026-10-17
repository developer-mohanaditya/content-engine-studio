import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Engine Studio | content.aweditya.com',
  description: 'Precision Social Media Cadence, Scripting & Storyboard Studio for Mohan Aditya Sadhanala',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-studio-900 text-studio-100 min-h-screen selection:bg-accent-cyan selection:text-studio-900">
        {children}
      </body>
    </html>
  );
}
