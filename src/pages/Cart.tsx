import React from 'react';
import { useCart } from '../components/CartContext';
import "../styles components/cart.css";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, dispatch, totalItems, totalPrice } = useCart();
   const navigate = useNavigate();

  const handleQuantityChange = (id: number, delta: number) => {
    dispatch({ type: delta > 0 ? 'INCREASE_QUANTITY' : 'DECREASE_QUANTITY', id });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="cart">
      <header className="top-links">
        <p onClick={ handleBack} className="back-home">&lt;</p>
        <div className="cart-icon">
          <CiShoppingCart />
          <span>{totalItems}</span>
        </div>
        <button onClick={handleClearCart}><AiOutlineDelete /></button>
      </header>
      <h1>Carrinho de Compra</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h2>{item.name}</h2>
            <p>USD {item.price}</p>
            <div className="cart-item-quantity">
              <button onClick={() => handleQuantityChange(item.id, -1)}><AiOutlineMinus /></button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}><AiOutlinePlus /></button>
            </div>
          </div>
          <button className="cart-item-remove" onClick={() => handleRemoveItem(item.id)}><AiOutlineDelete /></button>
        </div>
      ))}
      <div className="cart-summary">
        <p>Total {totalItems} Items</p>
        <p>USD {totalPrice.toFixed(2)}</p>
      </div>
      <button className="proceed-to-checkout">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
