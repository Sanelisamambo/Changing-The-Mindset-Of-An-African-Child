import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read - Changing The Mindset Of An African Child',
  description: 'Read Grade 12 Mathematics in isiZulu - A comprehensive mathematics resource written at age 18, dedicated to parents, and designed to empower learners through education in their own language.',
};

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}