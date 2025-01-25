import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = {
        id: Number(id),
        name: 'Produto Exemplo',
        description: 'Descrição detalhada do produto exemplo.',
        price: 99.99
      };
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Preço: R${product.price}</p>
    </div>
  );
};

export default ProductDetails;
