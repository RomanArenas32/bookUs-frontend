import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import clienteAxios from '../config/axios';
import './private.css';
import { Alerta, Avisos, Button } from '../utils';
import { useNavigate } from 'react-router-dom';

export const ListaUsuarios = () => {

  const navigate = useNavigate();
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


  const cambiarEstado = async (id) => {
    const confirmar = confirm('Deseas eliminar este usuario?')
    const token = localStorage.getItem('token');
    if (confirmar) {
      try {
        const config = {
          headers: {
            "token": `${token}`
          }
        };
        const { data } = await clienteAxios.delete(`/usuarios/${id}`, config);
        setAlerta({ mensaje: 'Usuario eliminado correctamente', error: false });
      } catch (error) {
        setAlerta({ mensaje: error.response.data.msg, error: true })
      }
    }
    else {
      setAlerta({ mensaje: 'Error contacte al administrador', error: true })
    }
  }

  const cerrarSeccion = () => {
    localStorage.removeItem("token");
    navigate('../')
  }
  const { mensaje } = alerta;

  return (
    <>
      <div className="botonesVarios">
        <div onClick={() => navigate('../agregarlibro')} className='botonesVarios-boton'>
          <Button titulo={"agregar un libro"} />
        </div>
        <div onClick={() => navigate('../libros')} className='botonesVarios-boton'>
          <Button titulo={"Volver a lista de libros"} />
        </div>
        <div onClick={() => navigate('../editusuario')} className='botonesVarios-boton'>
          <Button titulo={"actualizar mi usuario"} />
        </div>
        <div onClick={cerrarSeccion} className='botonesVarios-boton'>
          <Button titulo={"salir de la sesion"} />
        </div>
      </div>

      <main className='cotenedor-libros'>
        {rol === "ADMIN_ROLE" && listaUsuarios.map((el) => (
          <div className="cursos" key={el._id}>
            <p className="cursos-heading">
              {el.nombre} {el.apellido}
            </p>
            <p>
              {el.correo}
            </p>
            <button className='botonBorrar' onClick={() => cambiarEstado(el._id)}>
              BORRAR
            </button>
          </div>
        ))}
      </main>

      {mensaje && <Alerta alerta={alerta} />}
    </>
  )
}
