import { Link } from 'react-router-dom';
import axios from 'axios';


export const LandingPage = () => {
  const logout = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/auth/clear-cookies`,
        {},
        { headers: { 'Content-Type': 'application/json'}, withCredentials: true // With Credentials added.
        });
      const data = response.data;
      if (data.success) {
        console.log(data)
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
  };

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
          <li>
          <button onClick={logout}>
            logout
          </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingPage;