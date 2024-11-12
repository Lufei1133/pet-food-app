// src/components/Auth/ProtectedRoute.js
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import AuthService, { ROUTES } from '../../services/auth';
import {useEffect} from "react";

// src/components/Auth/ProtectedRoute.js
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isAuth = AuthService.isAuthenticated();
        console.log('ProtectedRoute check:', isAuth);  // 添加调试日志

        if (!isAuth) {
            console.log('Redirecting to login...');  // 添加调试日志
            navigate('/login', {
                replace: true,
                state: { from: location }
            });
        }
    }, [navigate, location]);

    return AuthService.isAuthenticated() ? children : null;
};

export default ProtectedRoute;