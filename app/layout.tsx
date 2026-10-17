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
      <body className="bg-studio-950 text-white min-h-screen selection:bg-white selection:text-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
