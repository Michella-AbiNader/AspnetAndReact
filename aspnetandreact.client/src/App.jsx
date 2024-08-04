//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Register'
import '../src/App.css'
//import RankItems from '../src/RankItems'
function App() {

    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
         </Router>
        </div>
    );

}

export default App;