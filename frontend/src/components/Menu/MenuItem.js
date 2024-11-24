import React, { useState } from "react";
import FoodItemForm from "./FoodItemForm";
import AddFoodItemModal from "./AddFoodItemModal";
import EditCategoryModal from "./EditCategoryModal";

const styles = {
  menuBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    justifyContent: 'space-between',
  },
  button: {
    padding: "8px",
    cursor: "pointer"
  },
  container: {
    width: '100%',
    marginTop: "40px"
  },
  header: {
    fontSize: "30px"
  },
  innerContainer: {
    padding: "80px"
  },
  title: {
    fontSize: "24px"
  },
  categoryTitle: {
    fontSize: "18px"
  },
  noCategories: {
    fontSize: "20px"
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.25rem'
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.75rem',
    marginTop: "16px"
  }
};

const MenuTitle = ({ name, onDelete, onEdit, onAdd }) => (
  <div style={styles.menuBox}>
    <h2 style={styles.title}>{name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unnamed Menu"}</h2>
    <div style={styles.buttonGroup}>
      <button style={styles.button} onClick={onDelete} className="btn">Delete</button>
      <button style={styles.button} onClick={onEdit} className="btn">Edit</button>
      <button style={styles.button} onClick={onAdd} className="btn">Add</button>
    </div>
  </div>
);

const CategorySection = ({ categoryItem, onDeleteCategoryItem, onEditCategoryItemClick, onAddFoodItemClick, handleDeleteFoodItem }) => {
  return (
    <>
      {categoryItem?.id !== null ? (
        <div>
          <div style={styles.categoryContainer}>
            <h3 style={styles.categoryTitle}>
              {categoryItem.name.charAt(0).toUpperCase() + categoryItem.name.slice(1)}
            </h3>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={() => onDeleteCategoryItem(categoryItem.id)}>Delete</button>
              <button style={styles.button} onClick={() => onEditCategoryItemClick(categoryItem)}>Edit</button>
              <button style={styles.button} onClick={() => onAddFoodItemClick(categoryItem)}>Add</button>
            </div>
          </div>
          {categoryItem.items?.map((item) => (
            <FoodItemForm key={item.id} food={item} categoryId={categoryItem.id} handleDeleteFoodItem={handleDeleteFoodItem} />
          ))}
        </div>
      ) : <h3 style={styles.noCategories}>There are no categories</h3>}
    </>
  )
}

const MenuItem = ({ menuItem, handleDeleteMenuItem, handleEditMenuItem, handleAddCategory, handleDeleteCategoryItem, handleEditCategoryItem, handleAddFoodItem, handleDeleteFoodItem, modals, toggleModal }) => {
  const [currentCategoryItem, setCurrentCategoryItem] = useState(null);

  const handleAddClick = (categoryItem) => {
    setCurrentCategoryItem(categoryItem);
    toggleModal("showFoodItemModal", true);
  };

  const handleEditClick = (categoryItem) => {
    setCurrentCategoryItem(categoryItem);
    toggleModal("showEditCategoryModal", true);
  }

  const handleModalClose = () => toggleModal("showFoodItemModal", false);
  const handleEditModalClose = () => toggleModal("showEditCategoryModal", false)

  if (!menuItem) return null;

  const categories = Object.values(menuItem.categories || {});

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Menu</h3>
      <div style={styles.innerContainer}>
        <MenuTitle
          name={menuItem.name}
          onDelete={() => handleDeleteMenuItem(menuItem.id)}
          onEdit={() => handleEditMenuItem(menuItem)}
          onAdd={() => handleAddCategory(menuItem)}
        />
        {
          categories.map((categoryItem) => (
            <CategorySection
              key={categoryItem?.id}
              categoryItem={categoryItem}
              onDeleteCategoryItem={handleDeleteCategoryItem}
              onEditCategoryItemClick={handleEditClick}
              onAddFoodItemClick={handleAddClick}
              handleDeleteFoodItem={handleDeleteFoodItem}
            />
          ))
        }
      </div>
      <AddFoodItemModal
        open={modals.showFoodItemModal}
        onClose={handleModalClose}
        menuItem={currentCategoryItem}
        onSave={(name, price, quantity, description) =>
          handleAddFoodItem(name, price, quantity, description, currentCategoryItem.id)
        }
      />
      <EditCategoryModal
        open={modals.showEditCategoryModal}
        onClose={handleEditModalClose}
        categoryItem={currentCategoryItem}
        onSave={(categoryItem) =>
          handleEditCategoryItem(categoryItem, menuItem.id)
        }
      />
    </div>
  );
};


export default MenuItem;
