import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PropertyDetail.css';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const [seller, setSeller] = useState({});

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await axios.get(`https://mernback-wvxi.onrender.com/api/properties/${id}`);
            setProperty(response.data);
            const sellerResponse = await axios.get(`https://mernback-wvxi.onrender.com/api/users/${response.data.seller}`);
            setSeller(sellerResponse.data);
        };

        fetchProperty();
    }, [id]);

    return (
        <div className="property-detail">
            <h2>Property Details</h2>
            <p>Place: {property.place}</p>
            <p>Area: {property.area} sq.ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby: {property.nearby}</p>
            <h3>Seller Details</h3>
            <p>Name: {seller.firstName} {seller.lastName}</p>
            <p>Email: {seller.email}</p>
            <p>Phone: {seller.phoneNumber}</p>
        </div>
    );
};

export default PropertyDetail;
