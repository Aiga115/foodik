import React from "react";
import SaladIcon from '../assets/salad.png';
import BurgerIcon from '../assets/burger.png';
import ShawermaIcon from '../assets/shawarma.png';
import PizzaIcon from '../assets/pizza.png';
import SausesIcon from '../assets/sauce.png';
import BeveragesIcon from '../assets/soda.png'


const Sidebar = () => {
    return (

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
        </div>
    )
}
export default Sidebar;
