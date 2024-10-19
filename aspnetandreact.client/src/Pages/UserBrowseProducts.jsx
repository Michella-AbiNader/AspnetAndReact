import { useEffect, useState } from 'react';
import { getProducts } from '../Services/ProductsServices'; 
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard'
import Cart from '../Components/Cart'
function UserBrowseProducts() {
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts(); 
                setProducts(res);
                setFilteredProducts(res);
                const uniqueCategories = [...new Set(res.map(shop => shop.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);
    useEffect(() => {
        let filtered = products;
        if (selectedCategory && products) {
            filtered = products.filter(shop => shop.category === selectedCategory);
        }
        setFilteredProducts(filtered);
    }, [selectedCategory, products]);

    // Filter based on search query within the filtered shops
    useEffect(() => {
        if (products) {
            const filtered = products.filter(shop =>
                shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!selectedCategory || shop.category === selectedCategory)
            );
            setFilteredProducts(filtered);
        }

    }, [searchQuery, selectedCategory, products]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleAddToCart = (productId) => {
        // Add to cart functionality
        console.log(`Product ${productId} added to cart`);
        // Here you would typically call your add to cart function or update cart state
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
                  {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                      ))
                  ) : (
                      <p>No products found for this shop.</p>
                  )}
              </div>
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

export default UserBrowseProducts;