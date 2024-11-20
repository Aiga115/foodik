import React, { useEffect, useState } from "react";
import EditMenuModal from "./EditMenuModal";
import MenuItem from "./MenuItem";
import AddCategoryModal from "./AddCategoryModal";
import AddMenuModal from "./AddMenuModal";
import {
  fetchMenus,
  handleAddMenuItem,
  handleAddCategoryItem,
  handleDeleteMenuItem,
  handleSaveMenuItem,
} from "../../utils";

const MenuList = () => {
  const [menu, setMenu] = useState([]);
  const [modals, setModals] = useState({
    showAddMenu: false,
    showEditMenu: false,
    showAddCategory: false,
  });
  const [currentMenuItem, setCurrentMenuItem] = useState(null);

  const toggleModal = (modalType, value) => {
    setModals((prev) => ({ ...prev, [modalType]: value }));
  };

  const refreshMenus = async () => {
    try {
      const updatedMenus = await fetchMenus();
      setMenu(updatedMenus);
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    }
  };

  const onAddMenuItem = async (name) => {
    try {
      await handleAddMenuItem(name);
      await refreshMenus();
      toggleModal("showAddMenu", false);
    } catch (error) {
      console.error("Failed to add menu:", error);
    }
  };

  const onAddCategoryItem = async (name, menuItem) => {
    try {
      await handleAddCategoryItem(name, menuItem);
      await refreshMenus();
      toggleModal("showAddCategory", false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const onDeleteMenuItem = async (menuId) => {
    try {
      await handleDeleteMenuItem(menuId);
      await refreshMenus();
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  const onEditMenuItem = async (updatedMenuItem) => {
    try {
      await handleSaveMenuItem(updatedMenuItem);
      await refreshMenus();
      toggleModal("showEditMenu", false);
    } catch (error) {
      console.error("Failed to edit menu:", error);
    }
  };

  useEffect(() => {
    refreshMenus();
  }, []);

  console.log("menu: ", menu);

  if (menu.length === 0) {
    return (
      <div className="empty-menu">
        <h1>No menu available. Please add one.</h1>
        <button
          onClick={() => toggleModal("showAddMenu", true)}
          className="btn"
        >
          Add Menu
        </button>
        <AddMenuModal
          open={modals.showAddMenu}
          onClose={() => toggleModal("showAddMenu", false)}
          onSave={onAddMenuItem}
        />
      </div>
    );
  }

  return (
    <div className="menu-list">
      <div className="heading">
        <h3>Add another menu?</h3>
        <button
          onClick={() => toggleModal("showAddMenu", true)}
          className="btn"
        >
          Add Menu
        </button>
      </div>

      {menu.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          handleDeleteMenuItem={onDeleteMenuItem}
          handleEditMenuItem={(updatedMenuItem) => {
            setCurrentMenuItem(menuItem); // Save current menu for editing
            toggleModal("showEditMenu", true);
          }}
          handleAddCategory={() => {
            setCurrentMenuItem(menuItem); // Save current menu for adding a category
            toggleModal("showAddCategory", true);
          }}
        />
      ))}

      <AddMenuModal
        open={modals.showAddMenu}
        onClose={() => toggleModal("showAddMenu", false)}
        onSave={onAddMenuItem}
      />

      <AddCategoryModal
        open={modals.showAddCategory}
        onClose={() => toggleModal("showAddCategory", false)}
        onSave={(name) => onAddCategoryItem(name, currentMenuItem)}
      />

      <EditMenuModal
        open={modals.showEditMenu}
        onClose={() => toggleModal("showEditMenu", false)}
        menuItem={currentMenuItem}
        onSave={(updatedMenuItem) => onEditMenuItem(updatedMenuItem)}
      />
    </div>
  );
};

export default MenuList;
