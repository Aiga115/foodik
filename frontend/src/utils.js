// menu api
export const fetchMenus = async (onUpdate) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/menus_with_items');
        const data = await response.json();
        onUpdate(data);
    } catch (error) {
        console.log(error);
    }
};

export const handleAddMenuItem = async (name, onModalClose) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            onModalClose();
            alert("Successfully updated!");
            return response.json();
        } else {
            const errorData = await response.json();
            console.error('Update failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const handleDeleteMenuItem = async (id, menu, setMenu) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/menus/${id}`, { method: 'DELETE' });
        if (response.ok) {
            setMenu(menu.filter(menuItem => menuItem.id !== id));
            alert("Successfully deleted!");
        } else {
            const errorData = await response.json();
            console.error('Delete failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const handleSaveMenuItem = async (menuItem, menu, setMenu, onModalClose) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/menus/${menuItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: menuItem.name })
        });

        if (response.ok) {
            setMenu(menu.map(item => (item.id === menuItem.id ? menuItem : item)));
            onModalClose();
            alert("Successfully updated!");
        } else {
            const errorData = await response.json();
            console.error('Update failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// category api
export const fetchCategories = async (onUpdate) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/categories');
        const data = await response.json();
        onUpdate(data);
    } catch (error) {
        console.log(error);
    }
}

export const handleAddCategoryItem = async (name, menuItem, onModalClose) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, menu_id: menuItem.id }),
        });

        if (response.ok) {
            onModalClose();
            alert("Successfully updated!");
            return response.json();
        } else {
            const errorData = await response.json();
            console.error('Update failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const handleDeleteCategoryItem = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/categories/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Successfully deleted!");
        } else {
            const errorData = await response.json();
            console.error('Delete failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export const handleSaveCategoryItem = async (categoryItem, menuItemId, onModalClose) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/categories/${categoryItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryItem.name, menu_id: menuItemId })
        });

        if (response.ok) {
            onModalClose();
            alert("Successfully updated!");
        } else {
            const errorData = await response.json();
            console.error('Update failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// food item api
export const handleAddFoodItem = async (name, price, quantity, description, category, onModalClose) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/food_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, quantity, description, category_id: category.id }),
        });

        if (response.ok) {
            onModalClose();
            alert("Successfully updated!");
            return response.json();
        } else {
            const errorData = await response.json();
            console.error('Update failed:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export const handleDeleteFoodItem = async (food) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/food_items/${food.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Successfully deleted!");
            fetchMenus();
        }
    } catch (error) {
        console.log(error);
    }
}

export const handleSaveFoodItem = async (food, name, price, quantity, description, categoryId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/food_items/${food.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                quantity,
                description,
                category_id: categoryId,
            }),
        });

        if (response.ok) {
            alert("Successfully updated!");
            fetchMenus()
        } else {
            const result = await response.json();
            alert(`Failed to update: ${result.error}`);
        }
    } catch (error) {
        console.log(error);
    }
}
