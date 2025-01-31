import React, { useState } from "react";
import '../styles components/bottomSheet.css'

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

interface Filters {
  category?: "headphone" | "headset";
  sortBy?: "popularity" | "highPrice" | "lowPrice";
}

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ isOpen, onClose, products, setFilteredProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState<"headphone" | "headset" | undefined>(undefined);
  const [selectedSortBy, setSelectedSortBy] = useState<"popularity" | "highPrice" | "lowPrice" | undefined>(undefined);

  const handleApplyFilters = () => {
    let filtered = products;

    // Aplicar filtro de categoria
    if (selectedCategory) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(selectedCategory));
    }

    // Aplicar ordenação por preço e popularidade
    if (selectedSortBy === "popularity") {
      filtered = filtered.filter(product => product.rating >= 4);
    } else if (selectedSortBy === "highPrice") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSortBy === "lowPrice") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
    onClose(); // Fechar o Bottom Sheet após aplicar os filtros
  };

  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
      <div className="content">
        <h2>Filter</h2>

        <div>
          <h3>Category</h3>
          <div>
            <button
              onClick={() => setSelectedCategory("headphone")}
              className={selectedCategory === "headphone" ? "selected" : ""}
            >
              Headphone
            </button>
            <button
              onClick={() => setSelectedCategory("headset")}
              className={selectedCategory === "headset" ? "selected" : ""}
            >
              Headset
            </button>
          </div>
        </div>

        <div>
          <h3>Sort By</h3>
          <div>
            <button
              onClick={() => setSelectedSortBy("popularity")}
              className={selectedSortBy === "popularity" ? "selected" : ""}
            >
              Popularity
            </button>
            <button
              onClick={() => setSelectedSortBy("highPrice")}
              className={selectedSortBy === "highPrice" ? "selected" : ""}
            >
              High Price
            </button>
            <button
              onClick={() => setSelectedSortBy("lowPrice")}
              className={selectedSortBy === "lowPrice" ? "selected" : ""}
            >
              Low Price
            </button>
          </div>
        </div>

        <button onClick={handleApplyFilters} className="apply-button">Apply Filter</button>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
