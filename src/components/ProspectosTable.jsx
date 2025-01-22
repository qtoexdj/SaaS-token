import React, { useState, useEffect, useCallback } from 'react';
    import { useAuth } from '../context/AuthContext';

    const ProspectosTable = () => {
      const { supabase, idInmobiliaria, rolInmobiliaria, rolGlobal } = useAuth();
      const [prospectos, setProspectos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const fetchProspectos = useCallback(async () => {
        setLoading(true);
        try {
          let query = supabase.from('prospectos').select('*');
          if (rolGlobal !== 'desarrollador') {
            query = query.eq('id_inmobiliaria', idInmobiliaria);
          }
          const { data, error } = await query;
          if (error) {
            setError(error.message);
          } else {
            setProspectos(data);
          }
        } catch (err) {
          setError('Error fetching prospectos.');
          console.error('Error fetching prospectos:', err);
        } finally {
          setLoading(false);
        }
      }, [supabase, idInmobiliaria, rolGlobal]);

      useEffect(() => {
        fetchProspectos();
      }, [fetchProspectos]);

      const handleEstadoChange = async (id, newEstado) => {
        if (rolInmobiliaria !== 'administrador') {
          alert('Solo los administradores pueden editar el estado.');
          return;
        }
        try {
          setLoading(true);
          const { error } = await supabase
            .from('prospectos')
            .update({ estado: newEstado })
            .eq('id', id);
          if (error) {
            setError(error.message);
          } else {
            setProspectos(
              prospectos.map((prospecto) =>
                prospecto.id === id ? { ...prospecto, estado: newEstado } : prospecto,
              ),
            );
          }
        } catch (err) {
          setError('Error updating prospecto.');
          console.error('Error updating prospecto:', err);
        } finally {
          setLoading(false);
        }
      };

      if (loading) {
        return <div>Loading prospectos...</div>;
      }

      if (error) {
        return <div className="text-red-500">Error: {error}</div>;
      }

      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {prospectos.map((prospecto) => (
                <tr key={prospecto.id}>
                  <td className="py-2 px-4 border-b">{prospecto.nombre}</td>
                  <td className="py-2 px-4 border-b">
                    {rolInmobiliaria === 'administrador' ? (
                      <select
                        className="border rounded p-1"
                        value={prospecto.estado}
                        onChange={(e) => handleEstadoChange(prospecto.id, e.target.value)}
                      >
                        <option value="nuevo">Nuevo</option>
                        <option value="contacto">Contacto</option>
                        <option value="interesado">Interesado</option>
                        <option value="cerrado">Cerrado</option>
                      </select>
                    ) : (
                      prospecto.estado
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{prospecto.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    export default ProspectosTable;
