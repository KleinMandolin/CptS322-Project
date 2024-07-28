import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import api from '../Auth/api.ts';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Ensure this import is here for styling

const AddUser: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userRole, setUserRole] = useState('admin');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await api.get('/auth/get-role', { withCredentials: true });
        setRole(response.data.role);
      } catch (error) {
        setError('Error fetching role');
      }
    };

    fetchRole();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setLastName(value);
    else if (name === 'userRole') setUserRole(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('/user-management/add-user', { username, password, email, firstName, lastName, userRole }, { withCredentials: true });
    } catch (error) {
      setError('Error adding user');
    }
  };

  if (role !== 'admin') {
    return <p>Access denied. You do not have the required permissions to view this page.</p>;
  }

  return (
    <div>
      <Link to="/launchpad">
        <button className="return_button">
          <FaArrowLeft />
        </button>
      </Link>
      <h1>Add User</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">Username:</label>
              </td>
              <td>
                <input type="text" id="username" name="username" value={username} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input type="password" id="password" name="password" value={password} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="firstName">First Name:</label>
              </td>
              <td>
                <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastName">Last Name:</label>
              </td>
              <td>
                <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userRole">User Role:</label>
              </td>
              <td>
                <input type="text" id="userRole" name="userRole" value={userRole} onChange={handleChange} autoComplete="off" required />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
                <button type="submit" className="button">Add User</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddUser;