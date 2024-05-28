import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        place: '',
        minArea: '',
        maxArea: '',
        minBedrooms: '',
        maxBedrooms: '',
        minBathrooms: '',
        maxBathrooms: ''
    });
    const navigate = useNavigate();

    const fetchProperties = async () => {
        try {
            const response = await axios.get('https://mernback-wvxi.onrender.com/api/properties');
            setProperties(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filteredProperties = properties;

        if (filters.place) {
            filteredProperties = filteredProperties.filter(property =>
                property.place.toLowerCase().includes(filters.place.toLowerCase())
            );
        }
        if (filters.minArea) {
            filteredProperties = filteredProperties.filter(property => property.area >= filters.minArea);
        }
        if (filters.maxArea) {
            filteredProperties = filteredProperties.filter(property => property.area <= filters.maxArea);
        }
        if (filters.minBedrooms) {
            filteredProperties = filteredProperties.filter(property => property.bedrooms >= filters.minBedrooms);
        }
        if (filters.maxBedrooms) {
            filteredProperties = filteredProperties.filter(property => property.bedrooms <= filters.maxBedrooms);
        }
        if (filters.minBathrooms) {
            filteredProperties = filteredProperties.filter(property => property.bathrooms >= filters.minBathrooms);
        }
        if (filters.maxBathrooms) {
            filteredProperties = filteredProperties.filter(property => property.bathrooms <= filters.maxBathrooms);
        }

        setProperties(filteredProperties);
    };

    const clearFilters = () => {
        setFilters({
            place: '',
            minArea: '',
            maxArea: '',
            minBedrooms: '',
            maxBedrooms: '',
            minBathrooms: '',
            maxBathrooms: ''
        });
        fetchProperties();
    };

    return (
        <main className="buyer-dashboard">
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
            <div className="dashboard-content">
                <h2>Find Your Dream Property</h2>
                <form className="filters" onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
                    <input type="text" name="place" value={filters.place} onChange={handleFilterChange} placeholder="Place" />
                    <input type="number" name="minArea" value={filters.minArea} onChange={handleFilterChange} placeholder="Min Area" />
                    <input type="number" name="maxArea" value={filters.maxArea} onChange={handleFilterChange} placeholder="Max Area" />
                    <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange} placeholder="Min Bedrooms" />
                    <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleFilterChange} placeholder="Max Bedrooms" />
                    <input type="number" name="minBathrooms" value={filters.minBathrooms} onChange={handleFilterChange} placeholder="Min Bathrooms" />
                    <input type="number" name="maxBathrooms" value={filters.maxBathrooms} onChange={handleFilterChange} placeholder="Max Bathrooms" />
                    <button type="submit">Apply Filters</button>
                    <button type="button" onClick={clearFilters}>Clear Filters</button>
                </form>
                <table className="property-list">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Area (sq.ft)</th>
                            <th>Bedrooms</th>
                            <th>Bathrooms</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id}>
                                <td>{property.place}</td>
                                <td>{property.area}</td>
                                <td>{property.bedrooms}</td>
                                <td>{property.bathrooms}</td>
                                <td><button onClick={() => navigate(`/property/${property._id}`)}>I'm Interested</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default BuyerDashboard;
