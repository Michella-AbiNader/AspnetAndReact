//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

//import RankItems from '../src/RankItems'
function App() {

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
                    <Route path="/admin/dashboard" element={<ShopAdminDashboard />} />
                    <Route path="/app" element={<UserApp />} />
                    <Route path="/system-admin/shop/:id" element={<SystemAdminViewShop />} />
                    <Route path="/system-admin/product/:id" element={<ViewProduct />} />

            </Routes>
        </Router>
        </UserProvider>
        </div>
    );

}

export default App;