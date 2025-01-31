import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import ExploreProducts from './pages/ExploreProducts';
import ProductDetail from './pages/ProductDetails'; // Importe a página de detalhes do produto
import 'react-spring-bottom-sheet/dist/style.css';
import { CartProvider } from './components/CartContext'; // Importe o CartProvider

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore-products" element={<ExploreProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Adicione a rota para a página de detalhes do produto */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
