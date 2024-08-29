import React, { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import Sidebar from "../components/Sidebar";
import FoodCard from "../components/FoodCard";
import { fetchMenus } from "../utils";

const Home = ({ handleAddToCart }) => {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchMenus((fetchedMenu) => {
      setMenu(fetchedMenu);

      // Set default selected menu and category
      if (fetchedMenu.length > 0) {
        const defaultMenu = fetchedMenu[0];
        const categoriesArray = Object.values(defaultMenu.categories);
        setSelectedMenu({ ...defaultMenu, categories: categoriesArray });
        setSelectedCategory(categoriesArray[0]?.name || null);
      }
    });
  }, []);

  const handleMenuSelect = (menuName) => {
    const selected = menu.find((m) => m.name === menuName);
    if (selected) {
      const categoriesArray = Object.values(selected.categories);
      setSelectedMenu({ ...selected, categories: categoriesArray });
      setSelectedCategory(categoriesArray[0]?.name || null);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const selectedItems = selectedMenu
    ? selectedMenu.categories.find((cat) => cat.name === selectedCategory)?.items || []
    : [];

  return (
    <>
      <div class="heading">
        <h3>our menu</h3>
        <p>Please enjoy!</p>
      </div>
      <div style={{ height: "100vh", width: "100%", display: "flex" }}>
        <Sidebar menu={menu} selectedMenu={selectedMenu} onMenuSelect={handleMenuSelect} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
          {selectedMenu && <Tabs categories={selectedMenu.categories} activeCategory={selectedCategory} onCategorySelect={handleCategorySelect} />}
          <section className="products" style={{ margin: 0 }}>
            <div className="box-container" style={{ gridTemplateColumns: "auto auto auto" }}>
              {selectedItems.map((item, index) => (
                <FoodCard key={index} item={item} handleAddToCart={handleAddToCart} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
