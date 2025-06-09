
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (product) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: {
        quantity: (prev[product.id]?.quantity || 0) + 1,
        productData: product,
      }
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      if (!prev[productId]) return prev;
      const updatedQty = prev[productId].quantity - 1;
      if (updatedQty <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: updatedQty,
        }
      };
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
