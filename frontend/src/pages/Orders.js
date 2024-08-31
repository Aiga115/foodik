import React, { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError('Failed to fetch orders.');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <>
            <div className="heading">
                <h3>Orders</h3>
                <p><a href="/">Home</a> <span> / Orders</span></p>
            </div>

            <section className="orders">
                <h1 className="title">Your Orders</h1>
                <div className="box-container">
                    {error && <p className="error">{error}</p>}
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div className="box" key={order.order_id}>
                                <p>Placed on: <span>{new Date(order.order_date).toLocaleDateString()}</span></p>
                                <p>Name: <span>{order.username}</span></p>
                                <p>Email: <span>{order.email}</span></p>
                                <p>Number: <span>{order.phone_number}</span></p>
                                <p>Address: <span>{order.address}</span></p>
                                <p>Payment Method: <span>{order.payment_method}</span></p>
                                <p>Order Items: <span>{order.order_items}</span></p>
                                <p>Total Price: <span>${order.total_price}</span></p>
                                <p>Payment Status: <span>{order.payment_status}</span></p>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Orders;
