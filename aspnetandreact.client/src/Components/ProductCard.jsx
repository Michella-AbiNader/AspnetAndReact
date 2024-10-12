// ProductCard.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../Styles/ProductCard.css'; // Add styles for the product card

function ProductCard({ product, onAddToCart }) {
    const navigate = useNavigate();

    const handleViewClick = () => {
        // Assuming you have a product details page
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-price">${product.price}</p>
                <div className="product-buttons">
                    <button className="view-button" onClick={handleViewClick}>View</button>
                    <button className="add-cart-button" onClick={() => onAddToCart(product.id)}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
