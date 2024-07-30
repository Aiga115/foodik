import React from "react";
import { useEffect, useState } from "react";

const MenuList = () => {
    const [menu, setMenu] = useState([]);
    const [menuId, setMenuId] = useState();

    const handleDeleteMenuItem = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/menus/${menuId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const result = await response.json();
          } 
        } catch (error) {
            console.log(error)
        }
      };

    useEffect(() => {
        fetch('http://127.0.0.1:5000/menus_with_items')
            .then(response => response.json())
            .then(data => setMenu(data));
    }, [])

    return (<div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', margin: '40px', gap: '100px' }}>
        {menu?.map((menuItem) => {
            return (
                <div key={menuItem.id} style={{ width: '100%', maxWidth: 800 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h2>{menuItem.name}</h2>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button onClick={handleDeleteMenuItem}>Delete</button>
                            <button>Edit</button>
                            <button>Add</button>
                        </div>
                    </div>
                    {Object.keys(menuItem.categories)?.map((category) => {
                        if (category === 'null') {
                            return
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
                                {menuItem.categories[category].items?.map((item) => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', width: '100%', marginTop: '12px' }}>
                                            <div style={{
                                                maxWidth: '600px',
                                                display: 'grid',
                                                gap: '10px',
                                                gridTemplateColumns: 'auto auto auto'
                                            }}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={item.name}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Price"
                                                    value={item.price}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Quantity"
                                                    value={item.quantity}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Description"
                                                    value={item.description}
                                                />
                                            </div>
                                            <div>
                                                <button>Delete</button>
                                                <button>Save</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )
        })}
    </div>)
}

export default MenuList;
