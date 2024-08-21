import React from "react";
import DishIcon from "../assets/dish.png";


const Card = ({ name, price, onAddToBasket }) => {
  return (
    <form action="" method="post" class="box">
      <input
        // type="hidden"
        name="name"
        value="burger"

      />
      {/* <input
        // type="hidden"
        name="price"
        value="20"
      /> */}
      {/* <input
        // type="hidden"
        name="image"
        //value="<?= $fetch_products['image']; ?>"
        value={DishIcon}

      /> */}
      <button
        type="submit"
        class="fas fa-shopping-cart"
        name="add_to_cart"
      ></button>
      <img src={DishIcon} alt="" style={{ width: "50px", height: "50px" }}  />
      <a
        href="category.php?category=<?= $fetch_products['category']; ?>"
        class="cat"
      ></a>
      <div class="name"></div>
      <div class="flex">
        <div class="price">
        <input
        // type="hidden"
        name="price"
        value="20"
      />
          <span>$</span>
        </div>
        <input
          type="number"
          name="qty"
          class="qty"
          min="1"
          max="99"
          value="1"
          maxlength="2"
        />
      </div>
    </form>
  );
};

export default Card;
