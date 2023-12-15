import { useEffect, useState } from 'react';
import { Header } from '../components';
import { useAuth } from '../hooks';
import clienteAxios from '../config/axios';

export const ListarUsuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const { usuarioAuth } = useAuth();
  const { rol } = usuarioAuth;

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const { data } = await clienteAxios.get('/usuarios/search');
        setListaUsuarios(data.usuarios);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <>
      <Header />
      {rol === "ADMIN_ROLE" && listaUsuarios.map((el) => (
        <div key={el._id}>
          <h3>{el.nombre}</h3>
        </div>
      ))}
    </>
  );
};
