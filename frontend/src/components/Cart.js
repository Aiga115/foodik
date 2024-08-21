import React, { useState } from "react";
import Card from "./Card";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleOrder = () => {
    // Logic to handle order submission, e.g., sending data to the backend
    alert("Order placed!");
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <Card />
              ))}
            </ul>
            <div className="cart-total">
              <h3>
                Total: $
                {cartItems
                  .reduce((total, item) => total + item.price * item.qty, 0)
                  .toFixed(2)}
              </h3>
            </div>
            <button onClick={handleOrder} className="order-button">
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
