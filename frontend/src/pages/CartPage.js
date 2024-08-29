import React from "react";
import FoodCard from "../components/FoodCard";

const CartPage = ({ cartItems, handleDeleteCartItem }) => {

    const handleOrder = () => {
        alert("Order placed!");
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;

            return total + (price * quantity);
        }, 0).toFixed(2);
    };
    
    return (
        <div className="cart-container">
            <div className="cart">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <section className="products" style={{ margin: 0 }}>
                            <div className="box-container" style={{ gridTemplateColumns: "auto auto auto" }}>
                                {cartItems.map((item, index) => (
                                    <FoodCard key={index} item={item} />
                                ))}
                            </div>
                            <div className="cart-total">
                                <h3>Total: ${calculateTotal()}</h3>
                            </div>
                            <button onClick={handleOrder} className="btn">
                                Place Order
                            </button>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;
