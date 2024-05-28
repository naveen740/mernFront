import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        // Check if user is logged in (check for 'userInfo' in localStorage)
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // If user is not logged in, redirect to the login page
        if (!userInfo || !userInfo.token) {
            navigate('/login');
        } else {
            // If user is logged in, navigate to the specified path
            navigate(path);
        }
    };

    return (
        <div className="home">
            <header className="home-header">
                <nav>
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Welcome to Real Estate Marketplace</h1>
                <p>Find your perfect property with ease</p>
                <div className="features">
                    <div className="feature" onClick={() => handleNavigation('/buyer-dashboard')}>
                        <h2>Buy</h2>
                        <p>Explore a variety of properties for sale</p>
                    </div>
                    <div className="feature" onClick={() => handleNavigation('/seller-dashboard')}>
                        <h2>Sell</h2>
                        <p>List your property and reach potential buyers</p>
                    </div>
                    <div className="feature" onClick={() => handleNavigation('/buyer-dashboard')}>
                        <h2>Rent</h2>
                        <p>Discover rental properties that suit your needs</p>
                    </div>
                </div>
                <Link to="/buyer-dashboard" className="explore-button">Explore Properties</Link>
            </main>
            <footer>
                <p>Contact us: info@realestate.com | Terms & Conditions</p>
            </footer>
        </div>
    );
};

export default Home;
