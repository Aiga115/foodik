import React from "react";

const Sidebar = ({ menu, selectedMenu, onMenuSelect }) => {
    return (
        <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '2rem' }}>
            <div className="sidebar">
                <ul>
                    {menu.map((menuItem) => (
                        <li key={menuItem.id} className={selectedMenu.name === menuItem.name ? "active_menu" : ""} onClick={() => onMenuSelect(menuItem.name)}>
                            <img src={getIconForMenu(menuItem.name)} alt={menuItem.name} />
                            {menuItem.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const getIconForMenu = (menuName) => {
    switch (menuName) {
        case 'salads': return require('../assets/salad.png');
        case 'burgers': return require('../assets/burger.png');
        case 'shawarmas': return require('../assets/shawarma.png');
        case 'pizzas': return require('../assets/pizza.png');
        case 'sauces': return require('../assets/sauce.png');
        case 'beverages': return require('../assets/soda.png');
        default: return '';
    }
};

export default Sidebar;
