import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactImg from "../assets/contact-img.svg";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://localhost:5000/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const result = await response.json();
            setSuccess("Message sent successfully!");
            setFormData({
                name: "",
                number: "",
                email: "",
                message: ""
            });
        } catch (error) {
            setError("Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="heading">
                <h3>contact us</h3>
                <p><Link to="/">home</Link> <span> / contact</span></p>
            </div>
            <section className="contact">
                <div className="row">
                    <div className="image">
                        <img src={ContactImg} alt="" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h3>tell us something!</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength="50"
                            className="box"
                            placeholder="enter your name"
                            required
                        />
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            min="0"
                            max="9999999999"
                            maxLength="10"
                            className="box"
                            placeholder="enter your number"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength="50"
                            className="box"
                            placeholder="enter your email"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="box"
                            required
                            placeholder="enter your message"
                            maxLength="500"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <input
                            type="submit"
                            value={isSubmitting ? "Sending..." : "Send Message"}
                            className="btn"
                            disabled={isSubmitting}
                        />
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
