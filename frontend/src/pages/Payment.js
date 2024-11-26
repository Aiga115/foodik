import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = ({ orderItems, user }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const navigate = useNavigate();

    const calculateTotalAmount = () => {
        return orderItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    useEffect(() => {
        const total = calculateTotalAmount();
        setTotalPrice(total);
    }, [orderItems]);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/user/${user}`);
                const userData = response.data;
                setUsername(userData.username);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError("Failed to fetch user data.");
            }
        };

        fetchUserData();
    }, [user]);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const formatOrderItems = () => {
        return orderItems.map(item => `${item.name}[${item.price}x${item.quantity}]`).join(', ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!address || !paymentMethod) {
            setError("Please complete all required fields.");
            return;
        }

        const textResult = formatOrderItems();

        const orderData = {
            username,
            email,
            phone_number: phoneNumber,
            address,
            payment_method: paymentMethod,
            total_price: totalPrice,
            payment_status: 'Success',
            order_items: textResult,
            card_info: paymentMethod === "credit card" ? cardInfo : null,
            order_status: 'Delivering'
        };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/orders', orderData);
            alert(response.data.message);
            setLoading(false);
            navigate('/orders');
        } catch (err) {
            setLoading(false);
            setError("Failed to place the order.");
        }
    };

    return (
        <>
            <div className="heading">
                <h3>Payment</h3>
                <p><Link to="/">Home</Link> <span> / Payment</span></p>
            </div>

            <section className="checkout">
                <h1 className="title">Order Summary</h1>

                <form onSubmit={handleSubmit}>
                    <div className="cart-items">
                        <h3>Cart Items</h3>
                        <p className="grand-total">
                            <span className="name">Grand Total:</span>
                            <span className="price">${totalPrice}</span>
                        </p>
                        <Link to="/cart" className="btn">View Cart</Link>
                    </div>

                    <div className="user-info">
                        <h3>Your Info</h3>
                        <p><i className="fas fa-user"></i><span>{username}</span></p>
                        <p><i className="fas fa-phone"></i><span>{phoneNumber}</span></p>
                        <p><i className="fas fa-envelope"></i><span>{email}</span></p>

                        <h3>Delivery Address</h3>
                        <input
                            type="text"
                            placeholder="Enter your address"
                            className="box"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <select
                            name="method"
                            className="box"
                            required
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value="" disabled>Select payment method --</option>
                            <option value="cash on delivery">Cash on Delivery</option>
                            <option value="credit card">Credit Card</option>
                        </select>

                        {paymentMethod === "credit card" && (
                            <div className="card-info">
                                <h3>Credit Card Information</h3>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    className="box"
                                    required
                                    value={cardInfo.cardNumber}
                                    onChange={handleCardInfoChange}
                                />
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="Expiry Date (MM/YY)"
                                    className="box"
                                    required
                                    value={cardInfo.expiryDate}
                                    onChange={handleCardInfoChange}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    className="box"
                                    required
                                    value={cardInfo.cvv}
                                    onChange={handleCardInfoChange}
                                />
                            </div>
                        )}

                        {error && <p className="error">{error}</p>}
                        <button
                            type="submit"
                            className="btn"
                            style={{ width: "100%", background: "red", color: "white" }}
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Payment;
