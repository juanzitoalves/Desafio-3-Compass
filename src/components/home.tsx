import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles components/Home.css";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Headphones");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038"
        );
        console.log("Resposta da API:", response.data);
        const fetchedProducts = response.data.products || response.data || [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([
          {
            id: 1,
            name: "Headphone X",
            price: 299.99,
            image: "../images/image 5.jpg",
            category: "Headphones",
          },
          {
            id: 2,
            name: "Headset Y",
            price: 399.99,
            image: "../images/image 5.jpg",
            category: "Headset",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleSearch = () => {
    navigate("/search");
  };

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product-details/${id}`);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <p id="hour-home">9:41</p>
      <div className="header-home"></div>
      <div className="title-home">
        <h4>Hi,</h4>
        <h1>What are you looking for today?</h1>
        {selectedProductName && <h2>Selected Product: {selectedProductName}</h2>}
      </div>
      <input
        className="search-home"
        type="text"
        placeholder="Search headphone"
        onClick={handleSearch}
      />
      <div className="products-home">
        <article className="tabs">
          <button
            className={`tab-button ${activeTab === "Headphones" ? "active" : ""}`}
            onClick={() => handleTabClick("Headphones")}
          >
            Headphone
          </button>
          <button
            className={`tab-button ${activeTab === "Headset" ? "active" : ""}`}
            onClick={() => handleTabClick("Headset")}
          >
            Headset
          </button>
        </article>
        <article className="first-carrossel">
          <Carousel responsive={responsive} arrows={false}>
            {loading ? (
              <p>Carregando produtos...</p>
            ) : (
              products
                .filter((product) => product.category === activeTab)
                .map((product) => (
                  <div
                    key={product.id}
                    className="product-item"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image || "../images/image 5.jpg"}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <a>Shop now</a>
                  </div>
                ))
            )}
          </Carousel>
        </article>
        <article className="featured-products">
          <h4>Featured Products</h4>
          <p>See All</p>
        </article>
        <article className="first-carrossel">
          <Carousel responsive={responsive} arrows={false}>
            {[
              ...products.filter(
                (product) =>
                  product.category === "Headphones" || product.category === "Headset"
              ),
              ...products
                .filter(
                  (product) =>
                    product.category !== "Headphones" && product.category !== "Headset"
                )
                .slice(0, 1),
            ]
              .reduce((unique, item) => {
                return unique.some((prod) => prod.id === item.id)
                  ? unique
                  : [...unique, item];
              }, [] as Product[])
              .map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    src={product.image || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>R${product.price.toFixed(2)}</p>
                </div>
              ))}
          </Carousel>
        </article>
      </div>
    </div>
  );
};

export default Home;