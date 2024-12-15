import { useEffect, useState, useContext } from 'react';
import { getProducts } from '../Services/ProductsServices'; 
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard'
import Cart from '../Components/Cart'
import { upsertCart } from '../Services/CartServices'
import UserContext from '../Components/UserContext';


function UserBrowseProducts() {
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useContext(UserContext);
    const [showMessage, setShowMessage] = useState(false)
    const [res, setRes] = useState({status: false, message: "An error occured"})

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
    const handleAddToCart = async (product_id) => {
        const product = products.find((p) => p.id === product_id);

        if (product) {
            const shop_id = product.shop_id; 
            var quantity = "1"
            var user_id = user.id
            try {
                var response = await upsertCart({ user_id, product_id, shop_id, quantity }); 
                setRes({ status: response.status, message: response.message })
            } catch (error) {
                console.log('Error adding to cart:', error);
            }
        } else {
            console.log('Product not found');
        }
        setShowMessage(true)

    };
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen); // Toggle cart visibility
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); // 5000ms = 5 seconds

            // Cleanup timeout if the component is unmounted or if showMessage changes
            return () => clearTimeout(timer);
        }
    }, [showMessage]);
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
                  {showMessage && <p className={res.status ? "msg-box-true2" : "msg-box-false2"}>{res.message}</p>
                  }
                  <input
                      type="text"
                      placeholder="Search Products"
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