// Cart.js - Shopping cart component
import useCart from "../hooks/useCart";

export default function Cart() {
  const { cart, dispatch, total } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map(item => (
        <div key={item.id}>
          {item.name} - ₹{item.price} × {item.quantity}
          <button onClick={() => dispatch({ type: "REMOVE", payload: item.id })}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹ {total}</h3>
    </div>
  );
}