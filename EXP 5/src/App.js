// App.js - Main application component
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <ProductList />
        <hr />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;