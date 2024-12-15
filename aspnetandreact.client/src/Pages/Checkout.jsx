import { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import UserContext from "../Components/UserContext";
import { getCart, CheckOut } from "../Services/CartServices"; 
import { useNavigate } from 'react-router-dom';
import '../Styles/CheckOut.css'; 

function Checkout() {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [location, setLocation] = useState("");
    const [total, setTotal] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCart(user.id);
                setCartItems(res);
                calculateTotal(res);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, [user.id]);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce(
            (acc, item) => Number(acc) + Number(item.quantity) * Number(item.price),
            0
        );
        setTotal(totalAmount);
    };

    const handleCheckout = async () => {
        //popup to confirm location handle yes on confirmation
        setShowConfirmation(true);

       
    };
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    const handleConfirmCheckOut = async (e) => {
        e.preventDefault()
        try {
            // Create an array of promises for each cart item
            const orderPromises = cartItems.map((item) => {
                const order = {
                    user_id: user.id,
                    product_id: item.product_id,
                    shop_id: item.shop_id,
                    quantity: item.quantity,
                    location: location,
                    date_order: new Date().toISOString(), 
                    status: "Pending"
                };

                return CheckOut(order); // Call the CheckOut function for each item
            });

            // Wait for all promises to resolve
            const responses = await Promise.all(orderPromises);

            // Check responses for success/failure messages
            //const successfulOrders = responses.filter((res) =>
            //    res.includes("successfully")
            //);
            //const failedOrders = responses.length - successfulOrders.length;

            //alert(
            //    `Checkout complete! ${successfulOrders.length} items added successfully, ${failedOrders} failed.`
            //);

            setCartItems([]);
            navigate("/app/shops"); 
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Failed to checkout. Please try again.");
        }
    }
    return (
        <>
            <NavBar />
            <div className="checkout-container">
                <h2 className="checkout-header">Checkout</h2>
                {cartItems.length > 0 ? (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={item.image_url}
                                        alt={item.product_name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <h4>{item.name}</h4>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Total: ${Number(item.quantity) * Number(item.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-summary">
                            <h3>Total: ${total}</h3>
                            <div className= "lcoation-Container">
                            <label htmlFor="location" className="location-label">
                                    <b>Enter Your Location:<span className="mandatory">*</span></b>
                            </label>
                            <input
                                type="text"
                                id="location"
                                placeholder="Your address"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                    className="Location-Bar"
                                required
                                />
                            </div>
                            <button
                                className="checkout-button"
                                onClick={handleCheckout}
                                disabled={!location}
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                {showConfirmation && (
                    <>
                        <div className="overlay"></div>
                        <div className="confirmation-box">
                            <p>Are you sure This is your address? It cannot be changed</p>
                            <p>{location}</p>
                            <button className="confirm-button" onClick={handleConfirmCheckOut}>Yes, I am sure</button>
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Checkout;
