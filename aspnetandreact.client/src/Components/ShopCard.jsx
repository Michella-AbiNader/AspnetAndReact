import PropTypes from 'prop-types';
import '../Styles/ShopCard.css';
import { useNavigate } from 'react-router-dom';

function ShopCard({ shop }) {
    const navigate = useNavigate();

    const handleViewProductsClick = () => {
        navigate(`/shop/${shop.id}/products`); 
    };
    return (
        <div className="shop-card">
            <img src={shop.image_url} alt={shop.name} className="shop-image" />
            <div className="shop-info">
                <h3>{shop.name}</h3>
                <p>{shop.category}</p>
                <button className="view-products-button" onClick={handleViewProductsClick}>
                    View Products
                </button>
            </div>
        </div>
    );
}
ShopCard.propTypes = {
    shop: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        theme_color: PropTypes.string,
    }).isRequired,
};
export default ShopCard;