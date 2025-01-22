import React from 'react';
    import { useAuth } from '../context/AuthContext';
    import { Navigate, useLocation } from 'react-router-dom';

    const RequireRole = ({ children, allowedRoles }) => {
      const { user, rolInmobiliaria, rolGlobal, loading } = useAuth();
      const location = useLocation();

      if (loading) {
        return <div>Loading...</div>;
      }

      if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      const userRole = rolGlobal === 'desarrollador' ? 'desarrollador' : rolInmobiliaria;

      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }

      return children;
    };

    export default RequireRole;
