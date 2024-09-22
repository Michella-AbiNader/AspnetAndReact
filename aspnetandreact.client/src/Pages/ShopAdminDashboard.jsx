import NavBar from "../Components/NavBar";
import UserContext from '../Components/UserContext'
import { useContext, useEffect, useState } from 'react'
import { getProductsByShopId } from '../Services/ProductsServices'
import ListTable from "../Components/ListTable";

function ShopAdminDashboard() {
    //fetch products based on the id stored in local storage
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await (getProductsByShopId(user.shop_id))
                setProducts(res);
            } catch (error) {
                console.log(error);
            }
        };
        //set the user with the shop id!!!!!
        if (user && user.theme_color) {
            var themeColor = user.theme_color
            localStorage.setItem('theme_color', themeColor); // Store theme color in local storage

            document.documentElement.style.setProperty('--mauve-light', themeColor); // Light variant
            document.documentElement.style.setProperty('--mauve-bright', lightenColor(themeColor, -5)); // Light variant
            document.documentElement.style.setProperty('--button-color', themeColor); // Light variant
            document.documentElement.style.setProperty('--button-onHover', lightenColor(themeColor, 20)); // Light variant
            document.documentElement.style.setProperty('--table-rows-hover', lightenColor(themeColor, 10)); // Light variant
            document.documentElement.style.setProperty('--table-rows', lightenColor(themeColor, 30)); // Light variant
            document.documentElement.style.setProperty('--navbar-hover-active', lightenColor(themeColor, -20)); // Light variant
        }
        fetchProducts();
    }, [user]); // Dependency array ensures this only runs when `id` changes
    return (
      <>
      <NavBar />
       <ListTable list={products} setList={setProducts} type="Products" shopId={user.shop_id} />
        </>
  );
}

export default ShopAdminDashboard;

function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1).toUpperCase()}`;
}