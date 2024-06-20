import { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';

export const TwoFactorAuth = () => {
    const [code, setCode] = useState('');
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Assuming username is passed via state in the location object from the previous page
        if (location.state && location.state.username) {
            setUsername(location.state.username);
        } else {
            setError('Username not found. Please try again.');
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log('JSON', JSON.stringify({ username, code }))

        try {
            const response = await fetch(`${backendUrl}/auth/verify2fa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, code }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log('data', data)

            if (data.accessToken) {
                console.log('Login successful: ', data)
            } else {
                setError('Invalid code. Please try again.');
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Two Factor Authentication</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Code:</label>
                    <input type="text" value={code} onChange={e => setCode(e.target.value)} />
                </div>
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

