import React from 'react';
    import { useAuth } from '../context/AuthContext';
    import ProspectosTable from './ProspectosTable';
    import CampañasGraficos from './CampañasGraficos';
    import VendedoresGestion from './VendedoresGestion';

    const AdminDashboard = () => {
      const { user, logout } = useAuth();
      const id_inmobiliaria = user?.user_metadata?.id_inmobiliaria;

      if (!id_inmobiliaria) {
        return <div className="text-red-500">Error: Usuario no asignado a una inmobiliaria.</div>;
      }

      return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Prospectos</h3>
            <ProspectosTable />
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Campañas</h3>
            <CampañasGraficos />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Vendedores</h3>
            <VendedoresGestion />
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    };

    export default AdminDashboard;
