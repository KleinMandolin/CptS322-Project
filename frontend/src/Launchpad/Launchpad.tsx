import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Launchpad extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(
        `${backendUrl}/auth/clear-cookies`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // With Credentials added.
        }
      );
      const data = response.data;
      if (data.success) {
        console.log(data);
      } else {
        console.log('Login failed: ', data);
        alert('Login failed');
      }
    } catch (error) {
      // @ts-expect-error: Error will have a response
      console.error(
        'Login failed:',
        error.response ? error.response.statusText : error.message
      );
      // @ts-expect-error: Error will have a response
      alert(
        'Login failed: ' +
          (error.response ? error.response.statusText : error.message)
      );
    }
  };

  render() {
    return (
      <>
        <div className="menu_header">
          <span>
            <button className="logout_button" onClick={() => this.logout()}>
              Logout
            </button>
          </span>
        </div>
        <div className="nav-buttons">
          <Link to="/inventory" style={{ textDecoration: 'none' }}>
            <button className="nav-button">Inventory</button>
          </Link>
          <Link to="/revenue" style={{ textDecoration: 'none' }}>
            <button className="nav-button">Revenue</button>
          </Link>
          <Link to="/menu" style={{ textDecoration: 'none' }}>
            <button className="nav-button">Menu</button>
          </Link>
          <h1>Food</h1>
        </div>
      </>
    );
  }
}

export default Launchpad;
