import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import SellerDashboard from './components/SellerDashboard';
import PropertyManagement from './components/PropertyManagement';
import BuyerDashboard from './components/BuyerDashboard';
import PropertyDetail from './components/PropertyDetail';
import Profile from './components/Profile';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/seller-dashboard" element={<SellerDashboard />} />
                    <Route path="/add-property" element={<PropertyManagement />} />
                    <Route path="/edit-property/:id" element={<PropertyManagement isEdit />} />
                    <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
