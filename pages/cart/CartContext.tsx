// Import the necessary dependencies
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Define CartContext
const CartContext = createContext<{
  cart: { product_id: string; quantity: number }[];
  addToCart: (product_id: string, quantity: number) => void;
  removeFromCart: (product_id: string) => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

// Define CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<{ product_id: string; quantity: number }[]>(
    []
  );

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addToCart = (product_id: string, quantity: number) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.product_id === product_id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { product_id, quantity }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (product_id: string) => {
    const updatedCart = cart.filter((item) => item.product_id !== product_id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Define custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
