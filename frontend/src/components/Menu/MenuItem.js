import React from "react";
import { useState } from "react";
import FoodItemForm from "./FoodItemForm";
import AddFoodItemModal from "./AddFoodItemModal";
import { handleAddFoodItem } from "../../utils";

const MenuItem = ({ menuItem, handleDeleteMenuItem, handleEditMenuItem, handleAddCategory }) => {
    const [currentCategoryItem, setCurrentCategoryItem] = useState(null);
    const [showFoodItemModal, setShowFoodItemModal] = useState(false);

    const handleAddClick = (categoryItem) => {
        setCurrentCategoryItem(categoryItem);
        setShowFoodItemModal(true);
    }

    const handleModalClose = () => {
        setShowFoodItemModal(false);
    }

    if (!menuItem) return null;

    return (
        <>
            <div style={{ width: '100%', maxWidth: 800 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h2>{menuItem.name}</h2>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button onClick={() => handleDeleteMenuItem(menuItem.id)}>Delete</button>
                        <button onClick={() => handleEditMenuItem(menuItem)}>Edit</button>
                        <button onClick={() => handleAddCategory(menuItem)}>Add</button>
                    </div>
                </div>
                {Object.keys(menuItem.categories)?.map((category) => {
                    if (category === 'null') return null;
                    const categoryItem = menuItem.categories[category];
                    return (
                        <div key={categoryItem?.id} style={{ marginTop: '16px', border: '1px solid grey', padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <h3>{categoryItem?.name}</h3>
                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    <button>Delete</button>
                                    <button>Edit</button>
                                    <button onClick={() => handleAddClick(categoryItem)}>Add</button>
                                </div>
                            </div>
                            {categoryItem.items?.map((item) => (
                                <React.Fragment key={item.id}>
                                    <FoodItemForm
                                        food={item}
                                        categoryId={categoryItem?.id}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })}
            </div>
            <AddFoodItemModal
                show={showFoodItemModal}
                onClose={() => setShowFoodItemModal(false)}
                menuItem={currentCategoryItem}
                onSave={(name, price, quantity, description) => handleAddFoodItem(name, price, quantity, description, currentCategoryItem, handleModalClose)}
            />
        </>
    )
}

export default MenuItem;