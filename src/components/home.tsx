import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { useNavigate} from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles components/Home.css'

interface Product {
  id: number;
  name: string;
  image: string;
  price: number
  category: string;
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

  const [activeTab, setActiveTab] = useState<string>('Headphone'); 

  const handleTabClick = (category: string) => {
  setActiveTab(category);
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
      <p>9:41</p>
      <div className='header-home'><p>Audio</p></div>
      <div className='title-home'>
        <h4>Hi, Juan</h4>
        <h1>What are you looking for today?</h1>
      </div>
      <input className='search-home' type="text" placeholder="Search headphone" onClick={handleSearch} />
      {Array.isArray(products) && products.length > 0 ? (
        <Carousel responsive={responsive}>
          {products.map(product => (
            <section key={product.id}>{product.name}</section>
          ))}
        </Carousel>
      ) : (
        <p></p>
      )}

      <div className='products-home'>
        <article className="tabs">
      {products.filter(product => product.category === activeTab) // Filtra os produtos pela aba ativa
          .map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>R${product.price}</p>
            </div>
          ))
        }
          <button className={`tab-button ${activeTab === 'Headphone' ? 'active' : ''}`} onClick={() => handleTabClick('Headphone')}>Headphone</button>
          <button className={`tab-button ${activeTab === 'Headset' ? 'active' : ''}`} onClick={() => handleTabClick('Headset')}>Headset</button>
        </article>
        

        <article>
          <h3>TMA-2 Modular Headphone</h3>
          <a href="# ">Shop now</a>
        </article>
        <article>
          <h4>Featured Products</h4>
          <p>See All</p>
        </article>

        <article>
          <div></div>
        </article>
      </div>

    </div>
  );
};

export default Home;

