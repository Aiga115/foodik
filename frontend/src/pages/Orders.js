import React, { useEffect, useState } from "react";

const Orders = ({ isAdmin }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatusBtnClick = async (orderId, orderStatus) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_status: orderStatus })
            });

            if (response.ok) {
                alert('Successfully done!')
                fetchOrders();
            } else {
                const errorData = await response.json();
                setError(`Update failed: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

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
                {isAdmin ? <h1 className="title">Orders</h1> : (
                    <h1 className="title">Your Orders</h1>
                )}
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
                                <p>Order Status: <span>{order.order_status}</span></p>
                                {isAdmin ? (<div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
                                    <button className="btn" onClick={() => updateOrderStatusBtnClick(order.order_id, 'Delivered')}>set as delivered</button>
                                    <button className="delete-btn" onClick={() => updateOrderStatusBtnClick(order.order_id, 'Cancelled')}>set as cancelled</button>
                                </div>) : (<></>)}
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
