import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useCart } from '../components/CartContext';
import { Star } from 'lucide-react';
import "../styles components/ProductDetails.css";
import { CiShoppingCart } from "react-icons/ci";

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

interface Comment {
  id: number;
  comment: string;
  author: string;
  date: string;
  rating: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'features'>('overview');
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewsRes, carouselRes, commentsRes] = await Promise.all([
          axios.get(`https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038/products/${id}`),
          axios.get(`https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038/products/${id}/reviews`),
          axios.get('https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038/carousel-products'),
          axios.get('https://run.mocky.io/v3/017beb87-0eb0-4fc2-b4d8-7ce6b8f1a16b')
        ]);

        console.log("Product data:", productRes.data); // Verificação dos dados do produto
        console.log("Comments data:", commentsRes.data); // Verificação dos dados dos comentários

        setProduct(productRes.data || null);
        setReviews(reviewsRes.data || []);
        setCarouselProducts(carouselRes.data || []);
        setComments(commentsRes.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate('/home');
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      setAddedToCart(true);
    }
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (loading) {
    return <div className="loading-spinner">Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const renderAdditionalContent = () => {
    if (id === '1') {
      return (
        <div className='products-info'>
          <p>USD 199.99</p>
          <h3>TMA-2 Modular Headphone</h3>
        </div>
      );
    }
    return null;
  };

  const renderAdditionalContent2 = () => {
    if (id === '2') {
      return (
        <div className='products-info'>
          <p>USD 350.00</p>
          <h3>TMA-2 HD Wireless</h3>
        </div>
      );
    }
    return null;
  };

  const renderAdditionalContent3 = () => {
    if (id === '3') {
      return (
        <div className='products-info'>
          <p>USD 25.00</p>
          <h3>C02 - Cable</h3>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <header className='top-links'>
        <p onClick={handleBack} className="back-home">&lt;</p>
        <CiShoppingCart onClick={handleCart} className='shop-car' />
      </header>

      {renderAdditionalContent()}
      {renderAdditionalContent2()}
      {renderAdditionalContent3()}

      <div className="tabs">
        <button onClick={() => setActiveTab('overview')} className={`tab-button ${activeTab === 'overview' ? 'active-tab' : ''}`}>
          Overview
        </button>
        <button onClick={() => setActiveTab('features')} className={`tab-button ${activeTab === 'features' ? 'active-tab' : ''}`}>
          Features
        </button>
      </div>

      {activeTab === 'overview' && <p>{product?.description}</p>}

      {activeTab === 'features' && (
        <div>
          <h3>Highly Detailed Audio</h3>
          <p>
            The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it
            stiffer, lighter and stronger than regular PET speaker units, and allowing the sound-producing diaphragm to
            vibrate without the levels of distortion found in other speakers.
          </p>
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          <img src={product?.image || 'https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/ef7e65e6c55b14894c569dd2948b130f.jpeg'} alt={product?.name} className="product-image" />

          <div className="reviews">
            <h2>Reviews</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="review">
                <div className='user-infos'>
                  <img src="/images/profile-placeholder.png" className="profile-pic" />
                  <h3>user309230983</h3>
                </div>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} fill={i < 4 ? '#FFD700' : 'gray'} stroke="none" />
                  ))}
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>

          <div className='carousel-container'>
            <div className="featured-products">
              <h4>Another Products</h4>
              <p>See All</p>
            </div>
            <Carousel responsive={responsive} arrows={false}>
              {carouselProducts.map((carouselProduct) => (
                <div key={carouselProduct.id} className="product-item">
                  <img
                    src={carouselProduct.image || 'https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/ef7e65e6c55b14894c569dd2948b130f.jpeg'}
                    alt={carouselProduct.name}
                    className="product-image"
                  />
                  <h3>{carouselProduct.name}</h3>
                  <p>Price: USD {carouselProduct.price}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
      <div className='atcb-container'>
        <button onClick={handleAddToCart} className="add-to-cart-button" disabled={addedToCart}>
          {addedToCart ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;