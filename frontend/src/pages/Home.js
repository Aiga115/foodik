import React from "react";
import SaladIcon from '../assets/salad.png';
import BurgerIcon from '../assets/burger.png';
import ShawermaIcon from '../assets/shawarma.png';
import PizzaIcon from '../assets/pizza.png';
import SausesIcon from '../assets/sauce.png';
import BeveragesIcon from '../assets/soda.png';
import Tabs from "../components/Tabs";


const Home = () => {
    return (
        <div style={{ height: '100vh', textAlign: 'center', width: '100%', position: "relative" }}>
            <div style={{
                margin: '0 auto',
                maxWidth: '1200px',
                padding: '2rem'
            }}>
            <div className="sidebar">
            <ul>
             <li><img src={SaladIcon} alt="Salad" />Salad</li>
             <li><img src={BurgerIcon} alt="Burger" />Burger</li>
             <li><img src={ShawermaIcon} alt="Shawerma" />Shawarma</li>
             <li><img src={PizzaIcon} alt="Pizza" />Pizza</li>   
             <li><img src={SausesIcon} alt="Sauses" />Sauce</li> 
             <li><img src={BeveragesIcon} alt="Beverages" />Beverages</li> 
            </ul>
            </div>
            <Tabs activeItem={"Salad"}/>
            </div>
        </div>
    )
}
export default Home;
