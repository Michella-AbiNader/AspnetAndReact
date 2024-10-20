import { useState, useEffect, useContext } from 'react';
import UserContext from "../Components/UserContext";
import { getCart } from '../Services/CartServices'; 

function Cart() {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0); 

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCart(user.id); 
                console.log(res)
                setCart(res);
                calculateTotal(res); 
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, [user.id]);

    // Calculate the total price of the cart
    const calculateTotal = (cartItems) => {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
       setTotal(totalPrice);
    };

    // Handle quantity increment/decrement
    const handleQuantityChange = async (productId, quantityChange) => {
        const updatedCart = cart.map(item => {
            if (item.product_id === productId) {
                const newQuantity = Number(item.quantity) + quantityChange;
                if (newQuantity >= 1) {
                    item.quantity = newQuantity;
                }
            }
            return item;
        });
        setCart([...updatedCart]);
        calculateTotal(updatedCart);
        // Update cart item quantity on the server
        //await updateCartItem(user.id, productId, updatedCart.find(item => item.product_id === productId).quantity);
    };

    // Handle removal of an item from the cart
    const handleRemoveItem = async (productId) => {
        //await removeFromCart(user.id, productId); // Remove item from cart on the server
        const updatedCart = cart.filter(item => item.product_id !== productId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
    };

    // Handle clearing the entire cart
    const handleClearCart = async () => {
       // await clearCart(user.id); // Clear the cart on the server
        setCart([]);
        setTotal(0); // Reset total
    };

    const handleCheckout = async () => {
        // Handle checkout

    };

    return (
        <div className="cart-panel2">
            <h3 className='head'>Your Cart</h3>
            {cart.length > 0 ? (
                <>
                    <ul className="cart-items">
                        {cart.map(item => (
                            <li key={item.product_id} className="cart-item">
                                <img src={item.image_url} alt={item.product_name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.name}</p>
                                    <div className="button_Div">

                                        <div className="cart-item-price">${item.price}</div>
                                    
                                        <div className="cart-item-quantity">
                                            
                                        <button onClick={() => handleQuantityChange(item.product_id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.product_id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="clear-cart" onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-actions">
                        <p>Total: ${total}</p>
                        <div className="button_Div">
                        <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
