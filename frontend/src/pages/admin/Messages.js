import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:5000/messages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                setError('Failed to fetch messages.');
                console.error('Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <p>Loading messages...</p>;
    }

    return (<>
        <div className="heading">
            <h3>messages</h3>
            <p><Link to="/admin-dashboard">admin home</Link> <span> / messages</span></p>
        </div>
        <section className="messages">
            <h1 className="title">Customer Messages</h1>
            <div className="box-container">
                {error && <p className="error">{error}</p>}
                {messages.length > 0 ? (
                    messages.map(message => (
                        <div className="box" key={message.id}>
                            <p>Placed on: <span>{new Date(message.created_at).toLocaleDateString()}</span></p>
                            <p>Name: <span>{message.name}</span></p>
                            <p>Email: <span>{message.email}</span></p>
                            <p>Number: <span>{message.number}</span></p>
                            <p>Message: <span>{message.message}</span></p>
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </section>
    </>)
}
export default Messages;