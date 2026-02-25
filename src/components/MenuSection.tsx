import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { menuCategories, MenuCategory } from '@/lib/menuData';

function MenuCategorySection({ category }: { category: MenuCategory }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredItems = useMemo(() => {
    if (selectedFilters.length === 0) {
      return category.items;
    }
    return category.items.filter((item) =>
      selectedFilters.some((filter) => item.filterTags?.includes(filter))
    );
  }, [category.items, selectedFilters]);

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="py-12 md:py-16 even:bg-secondary/30 scroll-mt-32 md:scroll-mt-36"
    >
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-10">
          <h2 id={`${category.id}-heading`} className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {category.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {category.description}
          </p>
        </header>

        {category.filters && (
          <CategoryFilter
            filters={category.filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredItems.map((item, index) => (
              <ProductCard key={item.id} {...item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Нет товаров по выбранным фильтрам
            </p>
            <button
              onClick={() => setSelectedFilters([])}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function MenuSection() {
  return (
    <div id="menu" role="region" aria-label="Меню">
      {menuCategories.map((category) => (
        <MenuCategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}
