type HeaderProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  "Women",
  "Men",
  "Streetwear",
  "Minimal",
  "Luxury",
  "Office",
  "Summer",
];

export default function Header({
  selectedCategory,
  onCategoryChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-[0.2em] text-black">
          Maldo Brands
        </h1>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm uppercase tracking-[0.15em] transition ${
                  isActive ? "text-black" : "text-neutral-500 hover:text-black"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
