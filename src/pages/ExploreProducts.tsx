import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterBottomSheet from "../components/FilterBottomSheet"; // Importe o componente do Bottom Sheet
import "../styles components/ExploreProducts.css"; // Importe seu arquivo CSS

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

const ExploreProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  // Buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        const duplicatedProducts = [...data, ...data]; // Duplica os produtos para exemplo
        setProducts(duplicatedProducts);
        setFilteredProducts(duplicatedProducts);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para voltar à página inicial
  const handleBack = () => {
    navigate("/home");
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <p id="hour-home">9:41</p>
      <p onClick={handleBack} className="back-home">
        &lt;
      </p>
      <h1 id="h1-title">All Products</h1>

      {/* Botão de Filtro */}
      <div>
        <button
          className="filter-button"
          onClick={() => setIsFilterVisible(true)}
        >
          Filter
        </button>
      </div>

      {/* Bottom Sheet de Filtro */}
      <FilterBottomSheet
        isOpen={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      {/* Lista de Produtos */}
      <div className="bg-explore">
        {filteredProducts.map((product, index) => (
          <div onClick={() => handleProductClick(product.id)} key={`${product.id}-${index}`} className="product-card">
            <img 
              src={product.image || 'https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/ef7e65e6c55b14894c569dd2948b130f.jpeg'} // Use a URL da imagem do produto
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">USD {product.price}</p>
            <div className="product-rating">
              <span>★ {product.rating} ({product.reviews} Reviews)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProducts;
