import React from "react";
import { Link } from "react-router-dom";
import ContactImg from "../assets/contact-img.svg";

const Contact = () => {
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

                    <form action="" method="post">
                        <h3>tell us something!</h3>
                        <input type="text" name="name" maxlength="50" className="box" placeholder="enter your name" required />
                        <input type="number" name="number" min="0" max="9999999999" className="box" placeholder="enter your number" required maxlength="10" />
                        <input type="email" name="email" maxlength="50" className="box" placeholder="enter your email" required />
                        <textarea name="msg" className="box" required placeholder="enter your message" maxlength="500" cols="30" rows="10"></textarea>
                        <input type="submit" value="send message" name="send" className="btn" />
                    </form>

                </div>

            </section>
        </>
    )
}

export default Contact;