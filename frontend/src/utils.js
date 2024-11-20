// Helper to handle API errors
const handleApiError = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Unknown error occurred');
    }
    return response.json();
};

// Menu API
export const fetchMenus = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/menus_with_items');
        const data = await handleApiError(response);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Fetch menus error:', error);
        return [];
    }
};

export const handleAddMenuItem = async (name) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        const data = await handleApiError(response);
        alert('Menu item successfully added!');
        return data; // Return the added menu item
    } catch (error) {
        console.error('Add menu item error:', error);
    }
};

export const handleDeleteMenuItem = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/menus/${id}`, { method: 'DELETE' });
        await handleApiError(response);
        alert('Menu item successfully deleted!');
        return id; // Return the deleted menu item's ID
    } catch (error) {
        console.error('Delete menu item error:', error);
    }
};

export const handleSaveMenuItem = async (menuItem) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/menus/${menuItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: menuItem.name }),
        });
        const data = await handleApiError(response);
        alert('Menu item successfully updated!');
        return data; // Return the updated menu item
    } catch (error) {
        console.error('Save menu item error:', error);
    }
};

// Category API
export const fetchCategories = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/categories');
        return await handleApiError(response);
    } catch (error) {
        console.error('Fetch categories error:', error);
        return [];
    }
};

export const handleAddCategoryItem = async (name, menuItemId) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, menu_id: menuItemId }),
        });
        const data = await handleApiError(response);
        alert('Category item successfully added!');
        return data; // Return the added category item
    } catch (error) {
        console.error('Add category item error:', error);
    }
};

export const handleDeleteCategoryItem = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/categories/${id}`, { method: 'DELETE' });
        await handleApiError(response);
        alert('Category item successfully deleted!');
        return id; // Return the deleted category item's ID
    } catch (error) {
        console.error('Delete category item error:', error);
    }
};

export const handleSaveCategoryItem = async (categoryItem, menuItemId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/categories/${categoryItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryItem.name, menu_id: menuItemId }),
        });
        const data = await handleApiError(response);
        alert('Category item successfully updated!');
        return data; // Return the updated category item
    } catch (error) {
        console.error('Save category item error:', error);
    }
};

// Food Item API
export const handleAddFoodItem = async (name, price, quantity, description, categoryId) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/food_items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity, description, category_id: categoryId }),
        });
        const data = await handleApiError(response);
        alert('Food item successfully added!');
        return data; // Return the added food item
    } catch (error) {
        console.error('Add food item error:', error);
    }
};

export const handleDeleteFoodItem = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/food_items/${id}`, { method: 'DELETE' });
        await handleApiError(response);
        alert('Food item successfully deleted!');
        return id; // Return the deleted food item's ID
    } catch (error) {
        console.error('Delete food item error:', error);
    }
};

export const handleSaveFoodItem = async (foodItem, name, price, quantity, description, categoryId) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/food_items/${foodItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, quantity, description, category_id: categoryId }),
        });
        const data = await handleApiError(response);
        alert('Food item successfully updated!');
        return data; // Return the updated food item
    } catch (error) {
        console.error('Save food item error:', error);
    }
};
