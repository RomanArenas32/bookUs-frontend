import { useEffect, useState } from 'react';
import { Header } from '../components';
import './private.css';
import clienteAxios from '../config/axios';
export const ListaLibros = () => {


  const [libros, setLibros] = useState([]);


  /*
  useEffect(()=>{
    const obtenerLibros = async ()=>{
      const listaLibros = await clienteAxios('/libros')
      setLibros(listaLibros)
    }
    obtenerLibros();
  },[libros])
*/
  return (
    <>
        <Header/>
    </>
  )
}
