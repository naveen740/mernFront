import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: 'buyer',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://mernback-wvxi.onrender.com/api/users2/profile', { withCredentials: true });
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/login');
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('https://mernback-wvxi.onrender.com/api/users2/profile', profileData, { withCredentials: true });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="form">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <select name="userType" value={profileData.userType} onChange={handleChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
