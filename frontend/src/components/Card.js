import React from "react";
import DishIcon from "../assets/dish.png";


const Card = ({ name, price, onAddToBasket }) => {
  return (
    <form action="" method="post" class="box">
      <input type="hidden" name="pid" value="" />
      <input
        type="hidden"
        name="name"
        value="<?= $fetch_products['name']; ?>"
      />
      <input
        type="hidden"
        name="price"
        value="<?= $fetch_products['price']; ?>"
      />
      <input
        type="hidden"
        name="image"
        value="<?= $fetch_products['image']; ?>"
      />
      <a
        href="quick_view.php?pid=<?= $fetch_products['id']; ?>"
        class="fas fa-eye"
      ></a>
      <button
        type="submit"
        class="fas fa-shopping-cart"
        name="add_to_cart"
      ></button>
      <img src="uploaded_img/<?= $fetch_products['image']; ?>" alt="" />
      <a
        href="category.php?category=<?= $fetch_products['category']; ?>"
        class="cat"
      ></a>
      <div class="name"></div>
      <div class="flex">
        <div class="price">
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
