import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
import { Button } from '../utils';
import { useAuth } from '../hooks';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);
  const { auth, usuarioAuth } = useAuth();


  useEffect(() => {
    const obtenerLibros = async () => {
      const { data } = await clienteAxios('/libros')
      setLibros(data.books)
    }
    obtenerLibros();
  }, [])

  return (
    <>
      <Header />
   
      <div>
        <Button titulo={"agregar un libro"} />
      </div>
      <div>
        <Button titulo={"actualizar usuario"} />
      </div>
      <div>
        <Button titulo={"salir de la sesion"} />
      </div>

      <main className='cotenedor-libros'>
        {
          libros.map(el => (
            <div className="cursos" key={el._id}>
              <img src={el.urlFoto} alt="foto" />
              <p className="heading">
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
