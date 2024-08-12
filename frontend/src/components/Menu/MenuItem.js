import React, { useState } from "react";
import FoodItemForm from "./FoodItemForm";
import AddFoodItemModal from "./AddFoodItemModal";
import EditCategoryModal from "./EditCategoryModal";
import { handleAddFoodItem, handleDeleteCategoryItem, handleSaveCategoryItem } from "../../utils";


const styles = {
    menuBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'space-between',
    },
    button: {
        padding: "8px"
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
}


const MenuTitle = ({ name, onDelete, onEdit, onAdd }) => (
    <div style={styles.menuBox}>
        <h2 style={styles.title}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={onDelete} className="btn">Delete</button>
            <button style={styles.button} onClick={onEdit} className="btn">Edit</button>
            <button style={styles.button} onClick={onAdd} className="btn">Add</button>
        </div>
    </div>
);

const CategorySection = ({ categoryItem, onDeleteCategoryItem, onEditCategoryItem, onAddFoodItem }) => (
    <div>
        <div style={styles.categoryContainer}>
            <h3 style={styles.categoryTitle}>{categoryItem.name.charAt(0).toUpperCase() + categoryItem.name.slice(1)}</h3>
            <div style={styles.buttonGroup}>
                <button style={styles.button} onClick={() => onDeleteCategoryItem(categoryItem.id)}>Delete</button>
                <button style={styles.button} onClick={() => onEditCategoryItem(categoryItem)}>Edit</button>
                <button style={styles.button} onClick={() => onAddFoodItem(categoryItem)}>Add</button>
            </div>
        </div>
        {categoryItem.items?.map((item) => (
            <FoodItemForm key={item.id} food={item} categoryId={categoryItem.id} />
        ))}
    </div>
);

const MenuItem = ({ menuItem, handleDeleteMenuItem, handleEditMenuItem, handleAddCategory }) => {
    const [currentCategoryItem, setCurrentCategoryItem] = useState(null);
    const [showFoodItemModal, setShowFoodItemModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

    const handleAddClick = (categoryItem) => {
        setCurrentCategoryItem(categoryItem);
        setShowFoodItemModal(true);
    };

    const handleModalClose = () => setShowFoodItemModal(false);

    const handleEditCategoryItem = (categoryItem) => {
        setCurrentCategoryItem(categoryItem);
        setShowEditCategoryModal(true);
    };

    const handleEditModalClose = () => setShowEditCategoryModal(false);

    if (!menuItem) return null;

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
                {Object.keys(menuItem.categories)?.map((category) => {
                    if (category === 'null') return <h3 style={styles.noCategories} key="no-categories">There are no categories</h3>;
                    const categoryItem = menuItem.categories[category];
                    return (
                        <CategorySection
                            key={categoryItem?.id}
                            categoryItem={categoryItem}
                            onDeleteCategoryItem={handleDeleteCategoryItem}
                            onEditCategoryItem={handleEditCategoryItem}
                            onAddFoodItem={handleAddClick}
                        />
                    );
                })}
            </div>
            <AddFoodItemModal
                open={showFoodItemModal}
                onClose={handleModalClose}
                menuItem={currentCategoryItem}
                onSave={(name, price, quantity, description) =>
                    handleAddFoodItem(name, price, quantity, description, currentCategoryItem, handleModalClose)
                }
            />
            <EditCategoryModal
                open={showEditCategoryModal}
                onClose={handleEditModalClose}
                categoryItem={currentCategoryItem}
                onSave={(categoryItem) =>
                    handleSaveCategoryItem(categoryItem, menuItem.id, handleEditModalClose)
                }
            />
        </div>
    );
};

export default MenuItem;
