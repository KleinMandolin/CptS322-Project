import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import api from '../Auth/api.ts';

export const TwoFactorAuth = () => {
  const isErrorWithMessage = (error: unknown): error is { message: string } => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // Handle the submission. Declare type for the event - react form element.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post(
        `/auth/verify-otp`,
        { code },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert('Login Successful');
        navigate(`/launchpad`, { replace: true })
      } else {
        setError('Invalid code. Try again.');
      }
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="menu_header" />
      <h1>Two Factor Authentication</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* This is the React form element that has this type: <HTMLFormElement>. React.FormEvent wraps the form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code: </label>
          <input
            required
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="form-button-holder">
          <button type="submit">Verify</button>
        </div>
      </form>
    </div>
  );
};
