import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Product {
  id: number;
  name: string;
  // Adicione outras propriedades conforme necessário
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setProducts([]);
      }
    };
    getProducts();
  }, []);

  const handleSearch = () => {
    navigate('/search');
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <input type="text" placeholder="Buscar..." onClick={handleSearch} />
      {Array.isArray(products) && products.length > 0 ? (
        <Carousel responsive={responsive}>
          {products.map(product => (
            <div key={product.id}>{product.name}</div>
          ))}
        </Carousel>
      ) : (
        <p>Nenhum produto encontrado</p>
      )}
    </div>
  );
};

export default Home;

