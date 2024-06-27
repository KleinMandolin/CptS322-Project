import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login }from './components/Login'
import { TwoFactorAuth } from './components/2fa';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" Component={Login} />
            <Route path="/login/2fa" Component={TwoFactorAuth} />
        </Routes>
    </Router>
)
