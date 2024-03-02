import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import './TopBar.css'

const TopBar = () => {
    return (
        <div>
        <h1>Welcome to Sweet</h1>
        <h4>Where your group project <i>actually</i> gets done.</h4>
        </div>
    );
};

export default TopBar;