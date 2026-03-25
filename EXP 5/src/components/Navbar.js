// Navbar.js - Navigation bar component
import useCart from "../hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px", background: "#ddd" }}>
      <h2>Shopping Website</h2>
      <div>Cart Items: {cart.length}</div>
    </nav>
  );
}