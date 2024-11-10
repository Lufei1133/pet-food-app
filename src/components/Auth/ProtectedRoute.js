// src/components/Auth/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import AuthService, { ROUTES } from '../../services/auth';

const ProtectedRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();

    if (!user?.token) {
        // 用户未登录，重定向到登录页
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;