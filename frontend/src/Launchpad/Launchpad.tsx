import React, { useState } from 'react';
import { Link } from 'react-router-dom';

class Launchpad extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="menu_header" />
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
