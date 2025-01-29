import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  // Função para buscar produtos da API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Busca os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    alert(`Procurando por: ${query}`);
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div>
        <p>9:41</p>
      </div>

      {/* Título da Página */}
      <p>&lt;</p>
      <h1>Search</h1>

      {/* Campo de Busca */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search headphone"
      />

      {/* Produto em Destaque */}
      <div>
        <h2>TMA-2 Comfort Wireless</h2>
        <p>USD 270</p>
        <div>
          <span>★★★★★</span>
        </div>
      </div>

      {/* Linha Divisória */}
      <hr />

      {/* Produtos Populares */}
      <h2>Popular Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src="../images/image 5.jpg" alt="" />
            <h3>{product.name}</h3>
            <p>USD {product.price}</p>
            <div>
              <span>★★★★★</span>
              <span>
                {product.rating} {product.reviews} Reviews
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;