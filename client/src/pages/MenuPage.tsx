import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { mockMenuItems, mockCategories } from "@/data/mockData";
import type { FilterOptions } from "@/types";

export function MenuPage() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<FilterOptions>({
    category: new URLSearchParams(location.split('?')[1] || '').get('category') || '',
    searchQuery: '',
    isVegetarian: undefined,
    priceRange: undefined,
  });

  const filteredItems = useMemo(() => {
    return mockMenuItems.filter((item) => {
      // Category filter
      if (filters.category && item.categoryId !== filters.category) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchFields = [
          item.name.toLowerCase(),
          item.description.toLowerCase(),
          ...(item.tags || []).map(tag => tag.toLowerCase()),
        ];
        if (!searchFields.some(field => field.includes(query))) {
          return false;
        }
      }

      // Vegetarian filter
      if (filters.isVegetarian !== undefined && item.isVegetarian !== filters.isVegetarian) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const price = parseFloat(item.price);
        const [min, max] = filters.priceRange;
        if (price < min || price > max) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      searchQuery: '',
      isVegetarian: undefined,
      priceRange: undefined,
    });
  };

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-heading font-bold mb-8">Our Menu</h1>
        
        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for dishes..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter('category', value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.isVegetarian?.toString() || ""}
                onValueChange={(value) => 
                  updateFilter('isVegetarian', value === "" ? undefined : value === "true")
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="true">Vegetarian</SelectItem>
                  <SelectItem value="false">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priceRange ? `${filters.priceRange[0]}-${filters.priceRange[1]}` : ""}
                onValueChange={(value) => {
                  if (value === "") {
                    updateFilter('priceRange', undefined);
                  } else {
                    const [min, max] = value.split('-').map(Number);
                    updateFilter('priceRange', [min, max]);
                  }
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="0-200">Under ₹200</SelectItem>
                  <SelectItem value="200-400">₹200-400</SelectItem>
                  <SelectItem value="400-1000">₹400+</SelectItem>
                </SelectContent>
              </Select>

              {(filters.category || filters.searchQuery || filters.isVegetarian !== undefined || filters.priceRange) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            {filters.category && (
              <span> in {mockCategories.find(c => c.id === filters.category)?.name}</span>
            )}
          </p>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-search text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
