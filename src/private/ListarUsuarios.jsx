import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { useAuth } from '../hooks';
import clienteAxios from '../config/axios';
import './private.css';
import { Alerta, Busqueda, Button } from '../utils';
import { useNavigate } from 'react-router-dom';

export const ListarUsuarios = () => {
  const navigate= useNavigate();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [alerta, setAlerta] = useState({});

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
  const cerrarSeccion = () => {
    localStorage.removeItem("token");
    navigate('../')
  }


  const borrarUsuario = async () => {
    console.log("borrando")
  }


  const { mensaje } = alerta;

  return (
    <>
      <Header />
      <div className="botonesVarios">
        <div onClick={() => navigate('../agregarlibro')} className='botonesVarios-boton'>
          <Button titulo={"agregar un libro"} />
        </div>
        <div onClick={() => navigate('../editusuario')} className='botonesVarios-boton'>
          <Button titulo={"actualizar mi usuario"} />
        </div>
        <div onClick={cerrarSeccion} className='botonesVarios-boton'>
          <Button titulo={"salir de la sesion"} />
        </div>
      </div>

      <div className='input-busqueda'>
        <Busqueda titulo={"Buscar usuario"} />
      </div>

      {rol === "ADMIN_ROLE" && listaUsuarios.map((el) => (
        <div key={el._id}>
          <h3>{el.nombre}</h3>
          <button className='botonBorrar' onClick={borrarUsuario}>BORRAR</button>
        </div>
      ))}
      {
        mensaje && <Alerta alerta={alerta} />
      }

      <Footer />
    </>
  );
};
