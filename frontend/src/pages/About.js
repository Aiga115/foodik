import React from "react";
import { Link } from "react-router-dom";
import AboutImg from "../assets/about-img.svg"


const About = () => {
    return (<>
        <div className="heading">
            <h3>about us</h3>
            <p><a href="home.php">home</a> <span> / about</span></p>
        </div>

        <section className="about">
            <div className="row">

                <div className="image">
                    <img src={AboutImg} alt="" />
                </div>

                <div className="content">
                    <h3>why choose us?</h3>
                    <p>A fully functional UNIVERSITY PROJECT written in python and javascript, using different backend and frontend libraries. This food website focuses on fast food and is designed to order food only from 'Foodik' restaurant.</p>
                    <Link to="/" className="btn">our menu</Link>
                </div>

            </div>

        </section>
    </>)
}

export default About;