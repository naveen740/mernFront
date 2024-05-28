import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: 'buyer',
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
            await axios.post('https://mernback-wvxi.onrender.com/api/users/register', formData);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                    </div>
                    <div className="form-group">
                        <select name="userType" value={formData.userType} onChange={handleChange}>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
