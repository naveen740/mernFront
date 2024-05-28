import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const PropertyManagement = ({ isEdit = false }) => {
    const [formData, setFormData] = useState({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearby: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            const fetchProperty = async () => {
                const response = await axios.get(`https://mernback-wvxi.onrender.com/api/properties/${id}`);
                setFormData(response.data);
            };

            fetchProperty();
        }
    }, [isEdit, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        try {
            if (isEdit) {
                await axios.put(`https://mernback-wvxi.onrender.com/api/properties/${id}`, formData, config);
            } else {
                await axios.post('https://mernback-wvxi.onrender.com/api/properties', formData, config);
            }
            navigate('/seller-dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>{isEdit ? 'Edit Property' : 'Add Property'}</h2>
            <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" required />
            <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Area (sq.ft)" required />
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" required />
<input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" required />
<input type="text" name="nearby" value={formData.nearby} onChange={handleChange} placeholder="Nearby (e.g., hospitals, colleges)" />
<button type="submit">{isEdit ? 'Update Property' : 'Add Property'}</button>
</form>
);
};

export default PropertyManagement;
