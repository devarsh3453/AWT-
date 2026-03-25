// CartContext.js - Context for managing cart state
import React, { createContext, useReducer } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE":
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage("cart", []);
  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  React.useEffect(() => {
    setStoredCart(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};