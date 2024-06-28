import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login }from './components/Login'
import { TwoFactorAuth } from './components/2fa';
import LandingPage from './components/Landing.tsx';
import InventoryPage from './components/InventoryPage.tsx';
import OrderPage from './components/OrderPage.tsx';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" Component={Login} />
            <Route path="/login/2fa" Component={TwoFactorAuth} />
            <Route path="/landing" Component={LandingPage} />
            <Route path="/order" Component={OrderPage} />
            <Route path="/inventory" Component={InventoryPage} />
        </Routes>
    </Router>
)
