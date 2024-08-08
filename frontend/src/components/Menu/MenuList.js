import React, { useEffect, useState } from "react";
import EditMenuModal from "./EditMenuModal";
import MenuItem from "./MenuItem";
import AddCategoryModal from "./AddCategoryModal";
import AddMenuModal from "./AddMenuModal";
import { fetchMenus, handleAddMenuItem, handleAddCategoryItem, handleDeleteMenuItem, handleSaveMenuItem } from "../../utils";


const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [showAddMenuModal, setShowAddMenuModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddCategoryModal, setShowCategoryModal] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(null);

    const handleFetchMenus = (newMenu) => {
        setMenu(newMenu);
    }

    const handleEditModalClose = () => {
        setShowEditModal(false);
    }

    const handleShowAddMenuModal = () => {
        setShowAddMenuModal(true);
    }

    const handleCloseAddMenuModal = () => {
        setShowAddMenuModal(false);
    }

    const handleAddModalClose = () => {
        setShowCategoryModal(false)
    }

    useEffect(() => {
        fetchMenus(handleFetchMenus);
    }, [menu]);

    if (menu.length === 0) {
        return (
            <>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: 'auto', gap: '10px' }}>
                    <p>There is no menu. Please add one</p>
                    <button onClick={handleShowAddMenuModal}>Add Menu</button>
                </div>
                <AddMenuModal
                    show={showAddMenuModal}
                    onClose={() => setShowAddMenuModal(false)}
                    onSave={(name) => handleAddMenuItem(name, handleCloseAddMenuModal)}
                />
            </>
        )
    }

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', margin: '40px', gap: '100px' }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <p>Do you want to add another menu? Please click on button</p>
                <button onClick={handleShowAddMenuModal}>Add Menu</button>
            </div>
            {menu?.map((menuItem) => (
                <MenuItem
                    key={menuItem.id}
                    menuItem={menuItem}
                    handleDeleteMenuItem={(id) => handleDeleteMenuItem(id, menu, setMenu)}
                    handleEditMenuItem={(menuItem) => {
                        setCurrentMenuItem(menuItem);
                        setShowEditModal(true);
                    }}
                    handleAddCategory={(menuItem) => {
                        setCurrentMenuItem(menuItem);
                        setShowCategoryModal(true);
                    }}
                />
            ))}
            {currentMenuItem && (
                <EditMenuModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    menuItem={currentMenuItem}
                    onSave={(menuItem) => handleSaveMenuItem(menuItem, menu, setMenu, handleEditModalClose)}
                />
            )}
            {currentMenuItem && (
                <AddCategoryModal
                    show={showAddCategoryModal}
                    onClose={() => setShowCategoryModal(false)}
                    menuItem={currentMenuItem}
                    onSave={(name) => handleAddCategoryItem(name, currentMenuItem, handleAddModalClose)}
                />
            )}
            <AddMenuModal
                show={showAddMenuModal}
                onClose={() => setShowAddMenuModal(false)}
                onSave={(name) => handleAddMenuItem(name, handleCloseAddMenuModal)}
            />
        </div>
    );
};

export default MenuList;
