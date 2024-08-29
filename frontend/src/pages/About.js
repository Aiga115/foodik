import React from "react";
import { Link } from "react-router-dom";
import AboutImg from "../assets/about-img.svg"


const About = () => {
    return (<>
        <div class="heading">
            <h3>about us</h3>
            <p><a href="home.php">home</a> <span> / about</span></p>
        </div>

        <section class="about">
            <div class="row">

                <div class="image">
                    <img src={AboutImg} alt="" />
                </div>

                <div class="content">
                    <h3>why choose us?</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, neque debitis incidunt qui ipsum sed doloremque a molestiae in veritatis ullam similique sunt aliquam dolores dolore? Quasi atque debitis nobis!</p>
                    <Link to="/" class="btn">our menu</Link>
                </div>

            </div>

        </section>
    </>)
}

export default About;