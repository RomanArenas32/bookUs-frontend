import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
import { Alerta, Avisos, Button } from '../utils';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);
  const [alerta, setAlerta] = useState({});

  const [libroPorNombre, setLibroPorNombre] = useState("");
  const [listaLibrosFiltrados, setListaLibrosFiltrados] = useState([]);

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


  const borrarLibro = async (id) => {
    const confirmar = confirm('Deseas eliminar este libro?')

    if (confirmar) {
      try {
        const { data } = await clienteAxios.delete(`/libros/${id}`);
        setAlerta({ mensaje: "Libro eliminado correctamente", error: false })

      } catch (error) {
        setAlerta({ mensaje: "Error al eliminar el libro", error: true })
      }
    }

    else {
      console.log("ok")
    }
  }
  const { rol, nombre } = usuarioAuth;

  const buscarLibroPorNombre = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clienteAxios.get(`libros/search?keyword=${libroPorNombre}`);
      setListaLibrosFiltrados(data)
    } catch (error) {
      console.log(error)
    }
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

        <input type="text" name="text" className="busqueda" placeholder="Buscar libro" required="" value={libroPorNombre} onChange={e => setLibroPorNombre(e.target.value)} />
        <button onClick={buscarLibroPorNombre}>buscar</button>

        <Avisos mensaje={`Hola ${nombre} aca podes ver todo el material didáctico`} />
      </div>
      {listaLibrosFiltrados.length !== 0 && (
        <>
          <Avisos mensaje={`El resultado es:`} />
          <div className='cotenedor-libros'>

            {listaLibrosFiltrados.map(el => (
              <div className="cursos" key={el._id}>
                <img src={el.urlFoto} alt="foto" />
                <p className="cursos-heading">
                  {el.titulo}
                </p>
                <p>
                  {el.sinopsis}
                </p>
                <button onClick={() => window.location.href = `${el.urlDescarga}`}>
                  DESCARGAR
                </button>
                {(rol === "ADMIN_ROLE") && <button className='botonBorrar' onClick={() => borrarLibro(el._id)}>BORRAR</button>}
              </div>
            ))}
          </div>
        </>
      )}


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
              <button onClick={() => window.location.assign(`${el.urlDescarga}`)}>
                DESCARGAR
              </button>

              {(rol === "ADMIN_ROLE") && <button className='botonBorrar' onClick={() => borrarLibro(el._id)}>BORRAR</button>}

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
