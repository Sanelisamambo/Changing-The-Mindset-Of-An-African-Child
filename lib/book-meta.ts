export const BOOK_META = {
  title: "Changing The Mindset Of An African Child",
  totalPages: 130,
  startPage: 1,
  coverImage: "/cover.png", // If your cover is also PNG
  chapters: [
    { id: "cover", label: "Cover", start: 1, end: 1 },
    { id: "title-copyright", label: "Title & Copyright", start: 2, end: 3 },
    { id: "number-patterns", label: "Number Patterns", start: 4, end: 40 },
    { id: "functions-graphs", label: "Functions & Graphs", start: 42, end: 62 },
    {
      id: "coordinate-geometry",
      label: "Coordinate Geometry",
      start: 64,
      end: 74,
    },
    {
      id: "euclidean-geometry",
      label: "Euclidean Geometry",
      start: 76,
      end: 94,
    },
    { id: "trigonometry", label: "Trigonometry", start: 96, end: 113 },
    { id: "calculus", label: "Calculus", start: 115, end: 128 },
    { id: "family-tribute", label: "Family Tribute", start: 129, end: 129 },
    { id: "goodbye", label: "Goodbye", start: 130, end: 130 },
  ],
  tributePage: 129,
  goodbyePage: 130,
};

export type Chapter = (typeof BOOK_META.chapters)[0];
