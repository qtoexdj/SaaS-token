import React from 'react';
    import { useAuth } from '../context/AuthContext';

    const Dashboard = () => {
      const { user, session, logout } = useAuth();
      console.log('JWT:', session?.access_token);

      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          {user && (
            <div className="mb-4">
              <p>
                <strong>Bienvenido {user.email}</strong>
              </p>
              <p>
                <strong>JWT Token:</strong>
              </p>
              <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                <code>{JSON.stringify(session?.access_token, null, 2)}</code>
              </pre>
            </div>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    };

    export default Dashboard;
