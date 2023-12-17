import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
import { Alerta, Avisos, Busqueda, Button } from '../utils';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);
  const [alerta, setAlerta] = useState({});

  const { usuarioAuth } = useAuth();
  const navigate = useNavigate();

  //LISTA LOS LIBROS
  useEffect(() => {
    const obtenerLibros = async () => {
      const { data } = await clienteAxios.get('/libros')
      setLibros(data.books)
    }
    obtenerLibros();
  }, [])


  const cerrarSeccion = () => {
    localStorage.removeItem("token");
    navigate('../')
  }


  const borrarLibro = async () => {
    console.log("borrando")
  }
  const { rol, nombre } = usuarioAuth;


  const { mensaje } = alerta;

  return (
    <>
      <Header />
      <div className="botonesVarios">
        <div onClick={() => navigate('../agregarlibro')} className='botonesVarios-boton'>
          <Button titulo={"agregar un libro"} />
        </div>
        <div onClick={() => navigate('../editusuario')} className='botonesVarios-boton'>
          <Button titulo={"actualizar usuario"} />
        </div>
        <div onClick={cerrarSeccion} className='botonesVarios-boton'>
          <Button titulo={"salir de la sesion"} />
        </div>
        {(rol === "ADMIN_ROLE") && <div onClick={() => navigate('../listarusuarios')} className='botonesVarios-boton'>
          <Button titulo={"listar usuarios"} />
        </div>}
      </div>

      <div className='input-busqueda'>
        <Busqueda titulo={"Buscar libro"} />
      </div>
      <div>
        <Avisos mensaje={`Hola ${nombre} aca podes ver todo el material didáctico`} />
      </div>
      <main className='cotenedor-libros'>
        {
          libros.map(el => (
            <div className="cursos" key={el._id}>
              <img src={el.urlFoto} alt="foto" />
              <p className="cursos-heading">
                {el.titulo}
              </p>
              <p>
                {el.sinopsis}
              </p>
              <button>DESCARGAR</button>
              {(rol === "ADMIN_ROLE") && <button className='botonBorrar' onClick={borrarLibro}>BORRAR</button>}

            </div>
          ))
        }
      </main>
      {
        mensaje && <Alerta alerta={alerta} />
      }
      <Footer />
    </>
  )
}
