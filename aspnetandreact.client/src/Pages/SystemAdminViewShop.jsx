import { useParams } from 'react-router-dom';
import ListTable from '../Components/ListTable';
import { useEffect, useState } from 'react';
import { getProductsByShopId } from '../Services/ProductsServices';
import NavBar from '../Components/NavBar';
import ViewEditDetails from '../Components/ViewEditDetails';
import { getShopById } from '../Services/ShopServices';

function SystemAdminViewShop() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState({});

    useEffect(() => {
        const fetchProductsShop = async () => {
            try {
                // Concurrent fetching of products and shop details
                const [productsRes, shopRes] = await Promise.all([
                    getProductsByShopId(id),
                    getShopById(id)
                ]);

                setProducts(productsRes);
                setShop(shopRes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductsShop();
    }, [id, products]); // Dependency array ensures this only runs when `id` changes

    return (
        <>
            <NavBar />
            <ViewEditDetails item={shop} type="Shop" />
            <ListTable list={products} setList={setProducts} type="Products" shopId={id} />
        </>
    );
}

export default SystemAdminViewShop;
