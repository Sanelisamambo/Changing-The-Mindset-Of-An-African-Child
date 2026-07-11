import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Changing The Mindset Of An African Child',
  description: 'isiZulu Grade 12 Mathematics Study Guide - A comprehensive mathematics resource designed to empower learners through education in their own language. This book provides clear explanations, practical examples, and step-by-step guidance to help students master Grade 12 mathematics concepts. Dedicated to parents and educators who believe in the power of mother-tongue education, this resource aims to build confidence and understanding in mathematics for every learner.',
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