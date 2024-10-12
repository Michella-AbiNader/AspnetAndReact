import UserContext from "../Components/UserContext";
import { useContext, useState, useEffect } from 'react';
import NavBar from "../Components/NavBar";
import { getShops } from '../Services/ShopServices'
import ShopCard from '../Components/ShopCard'
import Cart from '../Components/Cart'
import '../Styles/Cart.css'
function UserApp() {
    const { user } = useContext(UserContext)
    const [shops, setShops] = useState()
    const [filteredShops, setFilteredShops] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false); 

    useEffect(() => {
        const fetchShops= async () => {
            try {
                const res = await (getShops())
                setShops(res);
                setFilteredShops(res);

                // Extract unique categories from shops
                const uniqueCategories = [...new Set(res.map(shop => shop.category))];
                setCategories(uniqueCategories); // Set the categories
            } catch (error) {
                console.log(error);
            }
        };
        fetchShops();
    }, [user]);

    useEffect(() => {
        let filtered = shops;
        if (selectedCategory && shops) {
            filtered = shops.filter(shop => shop.category === selectedCategory);
        }
        setFilteredShops(filtered);
    }, [selectedCategory, shops]);

    // Filter based on search query within the filtered shops
    useEffect(() => {
        if (shops) {
            const filtered = shops.filter(shop =>
                shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!selectedCategory || shop.category === selectedCategory)
            );
            setFilteredShops(filtered);
        }
        
    }, [searchQuery, selectedCategory, shops]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); 
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); 
    };
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // Toggle cart visibility
    };
    return (
        <>
            <NavBar />
            <div className={`main-content ${isCartOpen ? 'cart-open' : ''}`}>
            <div className="filter-Container">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="Select-Bar"
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Search Shops"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="Search-Bar"
                />
            </div>
            <div className="shops-container">
                {shops && filteredShops.length > 0 ? (
                    filteredShops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                    ))
                ) : (
                    <p>No shops available</p>
                )}
            </div>
            {/* Cart Button */}
            <button className="cart-button" onClick={toggleCart}>
                Cart
            </button>
            </div>

            {isCartOpen && (
                <div className="cart-panel">
                    <Cart />
                </div>
            )}

        </>
  );
}

export default UserApp;