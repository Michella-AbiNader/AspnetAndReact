// UserViewProduct.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import NavBar from '../Components/NavBar';
import { getProductById } from '../Services/ProductsServices';
import '../Styles/UserViewProduct.css';
import Cart from '../Components/Cart';
import UserContext from '../Components/UserContext';
import { upsertCart } from '../Services/CartServices'


function UserViewProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [quantity, setQuantity] = useState(1); 
    const { user } = useContext(UserContext);
    const [showMessage, setShowMessage] = useState(false)
    const [res, setRes] = useState({ status: false, message: "An error occured" })


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(productId);
                setProduct(res[0]);
                console.log(res[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        const product_id = productId
        const shop_id = product.shop_id;
        var user_id = user.id
        try {
            var response = await upsertCart({ user_id, product_id, shop_id, quantity }); // Adjust the payload as needed
            setRes({ status : response.status, message : response.message})
        } catch (error) {
            console.log('Error adding to cart:', error);
        }
        setShowMessage(true)
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };
    const handleQuantityChange = (change) => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + change;
            return newQuantity < 1 ? 1 : newQuantity; 
        });
    };

    return (
        <>
            <NavBar />
            <div className="product-details-container">
                {product ? (
                    <>
                        <div className="product-wrapper">
                            <div className="product-image-wrapper">
                                <img src={product.image_url} alt={product.name} className="product-img" />
                            </div>
                            <div className="product-info-wrapper">
                            <div className="header-wrapper">
                                    <h2 className="header">{product.name}</h2>
                                    {showMessage && <p className={res.status ? "msg-box-true" : "msg-box-false"}>
                                        {res.message}</p>
                                    }
                                </div>
                                <h2><strong>${product.price}</strong> </h2>
                                <br></br>
                                <div className="description">{product.description}</div>
                                <br></br>
                                <div className="quantity-selector">
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
                                    <button className="add-cart-button" onClick={handleAddToCart}>Add to Cart</button>

                                </div>

                                <h5>Category: {product.category_name}</h5>

                            </div>
                        </div>

                        <div className={`main-content ${showCart ? 'cart-open' : ''}`}>
                            <button className="cart-button" onClick={toggleCart}>
                                Cart
                            </button>
                        </div>

                        {showCart && (
                            <div className="cart-panel">
                                <Cart />
                            </div>
                        )}
                    </>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>
        </>
    );
}

export default UserViewProduct;
