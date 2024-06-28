import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Landing Page</h1>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ margin: '20px' }}>
            <Link to="/order">Order</Link>
          </li>
          <li style={{ margin: '20px' }}>
            <Link to="/inventory">Inventory</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;