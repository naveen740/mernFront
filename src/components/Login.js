import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css'; // Assuming you create a Login.css file for styling

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mernback-wvxi.onrender.com/api/users/login', formData);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            if (response.data.userType === 'seller') {
                navigate('/seller-dashboard');
            } else {
                navigate('/buyer-dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p> {/* Link to register page */}
            </form>
        </div>
    );
};

export default Login;
