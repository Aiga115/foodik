import React from "react";
import { Link } from "react-router-dom";
import ContactImg from "../assets/contact-img.svg";

const Contact = () => {
    return (
        <>
            <div class="heading">
                <h3>contact us</h3>
                <p><Link to="/">home</Link> <span> / contact</span></p>
            </div>
            <section class="contact">

                <div class="row">

                    <div class="image">
                        <img src={ContactImg} alt="" />
                    </div>

                    <form action="" method="post">
                        <h3>tell us something!</h3>
                        <input type="text" name="name" maxlength="50" class="box" placeholder="enter your name" required />
                        <input type="number" name="number" min="0" max="9999999999" class="box" placeholder="enter your number" required maxlength="10" />
                        <input type="email" name="email" maxlength="50" class="box" placeholder="enter your email" required />
                        <textarea name="msg" class="box" required placeholder="enter your message" maxlength="500" cols="30" rows="10"></textarea>
                        <input type="submit" value="send message" name="send" class="btn" />
                    </form>

                </div>

            </section>
        </>
    )
}

export default Contact;