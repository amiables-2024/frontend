import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="nav-container" style={{display: 'flex', justifyContent: 'space-around'}}> {/* Updated styles for a row layout */}
            <Link to="/home">
                <div>Home</div>
            </Link>
        
            <Link to="/kanban">
                <div>Kanban Board</div>
            </Link>
        
            <Link to="/about">
                <div>About</div>
            </Link>
        </div>
    );
};

export default Navigation;
