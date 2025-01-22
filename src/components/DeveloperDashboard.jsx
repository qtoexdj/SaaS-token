import React from 'react';
    import { useAuth } from '../context/AuthContext';

    const DeveloperDashboard = () => {
      const { user, logout } = useAuth();
      const id_inmobiliaria = user?.user_metadata?.id_inmobiliaria;

      if (!id_inmobiliaria) {
        return <div className="text-red-500">Error: Usuario no asignado a una inmobiliaria.</div>;
      }

      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Developer Dashboard</h2>
          <p>
            This is the developer dashboard. You have access to all real estate companies.
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    };

    export default DeveloperDashboard;
