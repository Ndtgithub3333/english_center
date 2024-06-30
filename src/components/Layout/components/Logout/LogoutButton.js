import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const [loggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Remove access token
        setLoggedOut(true); // Set loggedOut state to trigger navigation
    };

    if (loggedOut) {
        navigate('/login'); // Navigate to the login page
        return null; // or return a loading indicator or message
    }

    return (
        <button onClick={handleLogout}>Đăng xuất</button>
    );
}

export default LogoutButton;
