type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-brand-text bg-brand-text text-white"
                : "border-brand-border bg-white text-brand-muted hover:border-brand-text/35 hover:text-brand-text"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
