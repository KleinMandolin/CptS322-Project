import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await axios.post(`${backendUrl}/auth/login`,
                { username, password },
                { headers: { 'Content-Type': 'application/json'}, withCredentials: true // With Credentials added.
                });

            const data = response.data;
            if (data.success) {
                console.log(data)
                navigate('login/2fa' );
            } else {
                console.log('Login failed: ', data);
                alert('Login failed')
            }
        } catch (error) {
            // @ts-expect-error: Error will have a response
            console.error('Login failed:', error.response ? error.response.statusText : error.message);
            // @ts-expect-error: Error will have a response
            alert('Login failed: ' + (error.response ? error.response.statusText : error.message));
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
