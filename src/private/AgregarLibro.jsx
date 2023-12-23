import '../auth/auth.css';
import './private.css';
import { Alerta, Button } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';

export const AgregarLibro = () => {

  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    urlFoto: '',
    urlDescarga: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }


  const AgregarLibro = async(e)=>{
    e.preventDefault();
    if ([formData.titulo, formData.sinopsis, formData.urlDescarga].includes("")) {
      setAlerta({ mensaje: 'No puede haber campos vacios', error: true });
      return;
    }
    try {
      const { data } = await clienteAxios.post(`/libros`, formData);
    
      setAlerta({ mensaje: "Libro agregado correctamente", error: false })

    } catch (error) {
      console.log(error)
      setAlerta({ mensaje: error.response.data.errors[0].msg, error: true })
      return;
    }
    setTimeout(() => {
      navigate("../libros")
    }, 2000);
  }

  const cerrarSeccion = () => {
    localStorage.removeItem("token");
    navigate('../')
  }
  const { mensaje } = alerta
  return (
    <>
      <div className="botonesVarios">
        <div className='botonesVarios-boton' onClick={() => navigate("../")}>
          <Button titulo={"volver al inicio"} />
        </div>
        <div className='botonesVarios-boton' onClick={() => navigate("../libros")}>
          <Button titulo={"Lista de libros"} />
        </div>
        <div className='botonesVarios-boton' onClick={() => navigate("../editusuario")}>
          <Button titulo={"actualizar usuario"} />
        </div>
        <div className='botonesVarios-boton' onClick={cerrarSeccion}>
          <Button titulo={"salir de la sesion"} />
        </div>

      </div>
      <div className='login-container'>

        <div className="card">
          <div className="card2">
            <form className="form">
              <p id="heading">AGREGA UN LIBRO</p>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="text" className="input-field"
                  id="titulo" placeholder="titulo del libro" onChange={handleInputChange} value={formData.titulo} />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <textarea type="text" className="input-field"
                  id="sinopsis" placeholder="Breve descripcion del libro" onChange={handleInputChange} value={formData.sinopsis} />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="text" className="input-field"
                  id="urlDescarga" placeholder="link de descarga" onChange={handleInputChange} value={formData.urlDescarga} />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="text" className="input-field"
                  id="urlFoto" placeholder="Agrege link de una foto si quiere" onChange={handleInputChange} value={formData.urlFoto} />
              </div>

              <div className="btn">
                <button className="button1" onClick={AgregarLibro}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agregar a la coleccion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
              </div>

            </form>
          </div>
        </div>
      </div>
      {mensaje && <Alerta alerta={alerta} />}
    </>
  )
}
