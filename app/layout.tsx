import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Changing The Mindset Of An African Child',
  description: 'Grade 12 Mathematics in isiZulu - A comprehensive mathematics resource written at age 18, dedicated to parents, and designed to empower learners through education in their own language.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}