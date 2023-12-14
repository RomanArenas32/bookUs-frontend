import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
import { Button } from '../utils';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);



  useEffect(() => {
    const obtenerLibros = async () => {
      const { data } = await clienteAxios('/libros')
      setLibros(data.books)
    }
    obtenerLibros();
  }, [])

  console.log(libros)
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
            <div class="cursos" key={el._id}>
            <img src={el.urlFoto} alt="foto" />
              <p class="heading">
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
