import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const TwoFactorAuth = () => {
    const isErrorWithMessage = (error: unknown): error is { message: string } => {
        return typeof error === 'object' && error !== null && 'message' in error;
    };

    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Handle the submission. Declare type for the event - react form element.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const instance = axios.create({
                withCredentials: true,
                baseURL: backendUrl
            })
            await instance.post(`/auth/verify-otp`, {
                code,
            });
            // Navigate to the landing page on successful OTP verification
            navigate('/landing');
        } catch (error: unknown) {
            if (isErrorWithMessage(error))
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Two Factor Authentication</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* This is the React form element that has this type: <HTMLFormElement>. React.FormEvent wraps the form */}
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