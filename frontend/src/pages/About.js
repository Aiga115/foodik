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
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, neque debitis incidunt qui ipsum sed doloremque a molestiae in veritatis ullam similique sunt aliquam dolores dolore? Quasi atque debitis nobis!</p>
                    <Link to="/" className="btn">our menu</Link>
                </div>

            </div>

        </section>
    </>)
}

export default About;