import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
import { Button } from '../utils';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);
  const { usuarioAuth, setUsuarioAuth } = useAuth();
  const navigate = useNavigate();

//LISTA LOS LIBROS
  useEffect(() => {
    const obtenerLibros = async () => {
      const { data } = await clienteAxios('/libros')
      setLibros(data.books)
    }
    obtenerLibros();
  }, [])

  console.log(usuarioAuth)

  const cerrarSeccion = ()=>{
    localStorage.removeItem("token");
    navigate('../')
  }

  return (
    <>
      <Header />
   <div className="botonesVarios">
    <div onClick={()=>navigate('../agregarlibro')} className='botonesVarios-boton'>
        <Button titulo={"agregar un libro"} />
      </div>
      <div onClick={()=> navigate('../editusuario')} className='botonesVarios-boton'>
        <Button titulo={"actualizar usuario"} />
      </div>
      <div onClick={cerrarSeccion} className='botonesVarios-boton'>
        <Button titulo={"salir de la sesion"} />
      </div>
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
              <p>
                <a href={`${el.urlDescarga}`} target='_blank' className='descarga'>descargar</a>
              </p>
            </div>
          ))
        }
      </main>

      <Footer />
    </>
  )
}
