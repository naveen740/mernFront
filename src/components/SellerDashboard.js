import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css'; // Import your custom stylesheet

const SellerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
            const response = await axios.get('https://mernback-wvxi.onrender.com/api/properties/seller/:sellerId', config);
            setProperties(response.data);
        };

        fetchProperties();
    }, []);

    const handleDelete = async (id) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`https://mernback-wvxi.onrender.com/api/properties/${id}`, config);
        setProperties(properties.filter(property => property._id !== id));
    };

    return (
        <main className="seller-dashboard">
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
            <div className="dashboard-content">
                <h2>Your Properties</h2>
                <button className="add-property-button" onClick={() => navigate('/add-property')}>Add Property</button>
                <ul className="property-list">
                    {properties.map((property) => (
                        <li key={property._id} className="property-item">
                            <div className="property-details">
                                <h3>{property.place}</h3>
                                <p>{property.area} sq.ft</p>
                                <p>Bedrooms: {property.bedrooms}</p>
                                <p>Bathrooms: {property.bathrooms}</p>
                            </div>
                            <div className="property-actions">
                                <button className="edit-button" onClick={() => navigate(`/edit-property/${property._id}`)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(property._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default SellerDashboard;
