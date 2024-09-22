//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Login from '../src/Pages/Login'
import Registration from '../src/Pages/Registration'
import SystemAdminDashboard from '../src/Pages/SystemAdminDashboard'
import ShopAdminDashboard from '../src/Pages/ShopAdminDashboard'
import UserApp from '../src/Pages/UserApp'
import { UserProvider } from '../src/Components/UserContext'
import SystemAdminViewShop from '../src/Pages/SystemAdminViewShop'
import ViewProduct from '../src/Pages/ViewProduct'
import SystemAdminCreateShop from '../src/Pages/SystemAdminCreateShop'
import '../src/App.css'
import SystemAdminCreateProduct from './Pages/SystemAdminCreateProduct';
import SystemAdminCreateCategory from './Pages/SystemAdminCreateCategory'
import AdminShopDeatils from './Pages/AdminShopDeatils';
import ShopAdminSales from './Pages/ShopAdminSales';
import ShopAdminInventory from './Pages/ShopAdminInventory'
import ShopAdminOrders from './Pages/ShopAdminOrders'
//import RankItems from '../src/RankItems'
function App() {
    useEffect(() => {
        // Check for theme_color in localStorage and apply it
        const themeColor = localStorage.getItem('theme_color');
        if (themeColor) {
            applyThemeColor(themeColor);
        } 
    }, []);
    return (
        <div>
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/system-admin/dashboard" element={<SystemAdminDashboard />} />
                    <Route path="/system-admin/createshop" element={<SystemAdminCreateShop />} />
                    <Route path="/system-admin/createproduct/:shopId" element={<SystemAdminCreateProduct />} />
                        <Route path="/system-admin/createcategory" element={<SystemAdminCreateCategory />} />
                    <Route path="/system-admin/shop/:id" element={<SystemAdminViewShop />} />
                        <Route path="/system-admin/product/:id" element={<ViewProduct />} />

                        <Route path="/admin/dashboard" element={<ShopAdminDashboard />} />
                        <Route path="/admin/product/:id" element={<ViewProduct />} />
                        <Route path="/admin/shop" element={<AdminShopDeatils />} />
                        <Route path="/admin/createproduct/:shopId" element={<SystemAdminCreateProduct />} />
                        <Route path="/admin/sales" element={<ShopAdminSales />} />
                        <Route path="/admin/inventory" element={<ShopAdminInventory />} />
                        <Route path="/admin/orders" element={<ShopAdminOrders />} />

                        <Route path="/app" element={<UserApp />} />

            </Routes>
        </Router>
        </UserProvider>
        </div>
    );

}

export default App;

// Function to apply the theme color (reuse the same one from ShopAdminDashboard)
function applyThemeColor(themeColor) {
    document.documentElement.style.setProperty('--mauve-light', themeColor);
    document.documentElement.style.setProperty('--mauve-bright', lightenColor(themeColor, -10));
    document.documentElement.style.setProperty('--button-color', themeColor);
    document.documentElement.style.setProperty('--button-hover', lightenColor(themeColor, -10));
    document.documentElement.style.setProperty('--table-rows', lightenColor(themeColor, 10));
    document.documentElement.style.setProperty('--table-rows-hover', lightenColor(themeColor, 20));
    document.documentElement.style.setProperty('--navbar-hover-active', lightenColor(themeColor, -20));
}
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