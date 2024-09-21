/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import { getShopInventory } from '../Services/SalesServices';
import UserContext from '../Components/UserContext';
import '../Styles/ShopAdminInventory.css';

function InventoryList() {
    const { user } = useContext(UserContext);
    const [inventory, setInventory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInventory, setFilteredInventory] = useState([]);


    // Fetch the inventory when the component is mounted
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await getShopInventory(user.shop_id);
                setInventory(res);
                setFilteredInventory(res);  // Initially, the filtered inventory is the same as the full inventory
            } catch (error) {
                console.log(error);
            }
        };
        fetchInventory();
    }, [user.shop_id]);

    // Function to handle search input changes and filter the inventory
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredInventory(
            inventory.filter(item =>
                item.product_name.toLowerCase().includes(query)
            )
        );
    };



    return (
        <div className="List-Container">
            <div className="header-Container">
                <p className="header">Inventory List</p>
                <input
                    className="Search-Bar"
                    placeholder="Search Product Name"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="table-container">
                {filteredInventory.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.product_id}>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                    <td>
                                        <span> {item.available_stock} </span>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
}

export default InventoryList;
