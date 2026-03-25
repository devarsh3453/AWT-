// useCart.js - Custom hook for cart functionality
import { useContext, useMemo } from "react";
import { CartContext } from "../CartContext";

export default function useCart() {
  const { cart, dispatch } = useContext(CartContext);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  return { cart, dispatch, total };
}