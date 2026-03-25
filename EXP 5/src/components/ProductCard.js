// ProductCard.js - Individual product card component
import useCart from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div style={{ border: "1px solid gray", padding: "20px", width: "200px" }}>
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <button onClick={() => dispatch({ type: "ADD", payload: product })}>
        Add to Cart
      </button>
    </div>
  );
}