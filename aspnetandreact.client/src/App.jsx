//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Register'
import SystemAdminDashboard from '../src/Pages/SystemAdminDashboard'
import ShopAdminDashboard from '../src/Pages/SystemAdminDashboard'
import UserApp from '../src/Pages/UserApp'
import { UserProvider } from '../src/Components/UserContext'
import SystemAdminViewShop from '../src/Pages/SystemAdminViewShop'
import ViewProduct from '../src/Pages/ViewProduct'

import '../src/App.css'
//import RankItems from '../src/RankItems'
function App() {

    return (
        <div>
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                        <Route path="/system-admin/dashboard" element={<SystemAdminDashboard />} />
                    <Route path="/adminDashboard" element={<ShopAdminDashboard />} />
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