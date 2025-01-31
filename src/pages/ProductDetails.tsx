import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CartContext } from '../components/CartContext'; // Importe o contexto do carrinho

interface Review {
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (!cartContext) {
      return; // ou algum estado de carregamento ou mensagem de erro
    }

    const { addToCart } = cartContext;

    // Buscar detalhes do produto pela API
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`URL_DA_API/produtos/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    // Buscar reviews do produto pela API
    const fetchReviews = async () => {
      try {
        const response = await fetch(`URL_DA_API/produtos/${id}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Erro ao buscar reviews:', error);
      }
    };

    // Buscar produtos para o carrossel
    const fetchCarouselProducts = async () => {
      try {
        const response = await fetch('URL_DA_API/carousel-products');
        const data = await response.json();
        setCarouselProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos para o carrossel:', error);
      }
    };

    fetchProductDetails();
    fetchReviews();
    fetchCarouselProducts();
  }, [id, cartContext]);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: USD {product.price}</p>
      <button onClick={() => cartContext?.addToCart(product)}>Add To Cart</button>

      <h2>Reviews</h2>
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <h3>{review.author}</h3>
            <p>{review.date}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <h2>Related Products</h2>
      <Carousel responsive={responsive}>
        {carouselProducts.map((carouselProduct, index) => (
          <div key={index}>
            <img src={carouselProduct.image} alt={carouselProduct.name} />
            <h3>{carouselProduct.name}</h3>
            <p>{carouselProduct.price}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetail;
