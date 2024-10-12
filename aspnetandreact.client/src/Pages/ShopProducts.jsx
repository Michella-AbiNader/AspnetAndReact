// ShopProducts.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductsByShopId } from '../Services/ProductsServices'; // Your service function to fetch products

function ShopProducts() {
    const { shopId } = useParams(); // Get shopId from the URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProductsByShopId(shopId); // Fetch products by shopId
                setProducts(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [shopId]);

    return (
        <div>
            <h1>Products for Shop {shopId}</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found for this shop.</p>
            )}
        </div>
    );
}

export default ShopProducts;
