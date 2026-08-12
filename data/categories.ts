export const categories = [
  "Women",
  "Men",
  "Streetwear",
  "Minimal",
  "Luxury",
  "Office",
  "Summer",
] as const;

export type Category = (typeof categories)[number];
