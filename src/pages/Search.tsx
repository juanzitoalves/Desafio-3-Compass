import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles components/Search.css"

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Função para buscar produtos da API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data.slice(0, 3)); // Mostra os 3 primeiros produtos
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleBack = () => {
    navigate('/home')
  }

  // Filtra os produtos com base na query
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered.slice(0, 3)); // Mostra os 3 primeiros resultados
  };

  // Busca os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Cabeçalho */}
      <p id='hour-home'>9:41</p>

      {/* Título da Página */}
      <div className='title-search'>
        <p onClick={handleBack}>&lt;</p>
        <h1>Search</h1>
      </div>

      {/* Campo de Busca */}
      <div className='search-field'>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}placeholder="Search headphone"/>
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Produto em Destaque */}
      <article>
        {products.length > 0 && ( // Verifica se há produtos no array
          <div key={products[0].id}>
            <img src="../images/image 5.jpg" alt={products[0].name} />
            <h3>{products[0].name}</h3>
            <p>USD {products[0].price}</p>
            <div>
              <span>★</span>
              <span>
                {products[0].rating} {products[0].reviews} Reviews
              </span>
            </div>
          </div>
        )}
      </article>


      {/* Produtos Populares */}
      <article className='popular-products'>
        <h2>Popular Products</h2>
        {filteredProducts.map((product) => (
          <div className='products' key={product.id}>
            <img src="../images/image 5.jpg" alt={product.name} />
            <h3>{product.name}</h3>
            <p>USD {product.price}</p>
            <div>
              <span id='star'>★</span>
              <span>
                {product.rating} {product.reviews}
              </span>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Search;