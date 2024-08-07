import React, { useEffect, useState } from "react";
import FoodItemForm from "./FoodItemForm";
import EditMenuModal from "./EditMenuModal"; // Import the modal component

const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(null);

    const fetchMenus = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/menus_with_items');
            const data = await response.json();
            setMenu(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/menus/${id}`, {
                method: 'DELETE',
            });

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

    const handleEditMenuItem = (menuItem) => {
        setCurrentMenuItem(menuItem);
        setShowEditModal(true);
    };

    const handleSaveMenuItem = async (menuItem) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/menus/${menuItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: menuItem.name })
            });

            if (response.ok) {
                setMenu(menu.map(item => (item.id === menuItem.id ? menuItem : item)));
                setShowEditModal(false);
                alert("Successfully updated!");
            } else {
                const errorData = await response.json();
                console.error('Update failed:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', margin: '40px', gap: '100px' }}>
            {menu?.map((menuItem) => (
                <div key={menuItem.id} style={{ width: '100%', maxWidth: 800 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h2>{menuItem.name}</h2>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button onClick={() => handleDeleteMenuItem(menuItem.id)}>Delete</button>
                            <button onClick={() => handleEditMenuItem(menuItem)}>Edit</button>
                            <button>Add</button>
                        </div>
                    </div>
                    {Object.keys(menuItem.categories)?.map((category) => {
                        if (category === 'null') {
                            return null;
                        }
                        return (
                            <div key={menuItem.categories[category]?.id} style={{ marginTop: '16px', border: '1px solid grey', padding: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <h3>{menuItem.categories[category]?.name}</h3>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <button>Delete</button>
                                        <button>Edit</button>
                                        <button>Add</button>
                                    </div>
                                </div>
                                {menuItem.categories[category].items?.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <FoodItemForm
                                            food={item}
                                            categoryId={menuItem.categories[category]?.id}
                                            onUpdate={fetchMenus}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        );
                    })}
                </div>
            ))}
            {currentMenuItem && (
                <EditMenuModal 
                    show={showEditModal} 
                    onClose={() => setShowEditModal(false)} 
                    menuItem={currentMenuItem} 
                    onSave={handleSaveMenuItem} 
                />
            )}
        </div>
    );
};

export default MenuList;
