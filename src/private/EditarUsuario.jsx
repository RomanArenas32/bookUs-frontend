import './private.css';
import '../auth/auth.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alerta, Button } from '../utils';
import clienteAxios from '../config/axios';
import { useAuth } from '../hooks';
export const EditarUsuario = () => {

  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});
  const [repetirPass, setRepetirPass] = useState("");
  const [rolNuevo, setRolNuevo] = useState("");
  const { usuarioAuth } = useAuth();
  const { correo, _id, rol } = usuarioAuth;
  


  const [formData, setFormData] = useState((prevFormData) => ({
    ...prevFormData,
    nombre: '',
    apellido: '',
    correo: correo,
    password: '',
    rol: rol,
  }));

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const editarUsuario = async (e) => {
    e.preventDefault();
    if ([formData.nombre, formData.apellido, formData.password].includes("")) {
      setAlerta({ mensaje: 'No puede haber campos vacios', error: true });
      return;
    }
    if (formData.password !== repetirPass) {
      setAlerta({ mensaje: 'Las contraseñas deben ser iguales', error: true });
      return;
    }
    if (rolNuevo === import.meta.env.VITE_ADMIN) {
      formData.rol = "ADMIN_ROLE"
    }
    try {
      const { data } = await clienteAxios.put(`/usuarios/${_id}`, formData);
      console.log(data)
      setAlerta({ mensaje: "Usuario actualizado correctamente", error: false })
    } catch (error) {
      setAlerta({ mensaje: error.response.data.errors[0].msg, error: true })
      return;
    }

  }

  const cerrarSeccion = () => {
    localStorage.removeItem("token");
    navigate('../')
  }
  const { mensaje } = alerta
  return (
    <>
      <div className="botonesVarios">
        <div onClick={() => navigate('../agregarlibro')} className='botonesVarios-boton'>
          <Button titulo={"agregar un libro"} />
        </div>
        <div onClick={() => navigate('../libros')} className='botonesVarios-boton'>
          <Button titulo={"volver a lista de libros"} />
        </div>
        <div onClick={cerrarSeccion} className='botonesVarios-boton'>
          <Button titulo={"salir de la sesion"} />
        </div>
      </div>
      <div className='login-container'>
        <div className="card">
          <div className="card2">
            <form className="form">
              <p id="heading">EDITAR PERFIL</p>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="text" className="input-field" placeholder="nombre"
                  id="nombre"
                  onChange={handleInputChange} value={formData.nombre}
                />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="text" className="input-field" placeholder="apellido"
                  id="apellido"
                  onChange={handleInputChange} value={formData.apellido}
                />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input type="email" className="input-field"
                  disabled
                  id="correo" placeholder={correo} value={formData.correo} />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
                <input type="password" className="input-field" placeholder="nueva contraseña"
                  id="password"
                  onChange={handleInputChange} value={formData.password}
                />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
                <input type="password" className="input-field" placeholder="repite la nueva contraseña"

                  onChange={(e) => setRepetirPass(e.target.value)} value={repetirPass}
                />
              </div>
              <div className="field">
                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                </svg>
                <input type="password" className="input-field" placeholder="clave de administrador si tienes"
                  onChange={(e) => setRolNuevo(e.target.value)} value={rolNuevo}
                />
              </div>

              <div className="btn">
                <button className="button2" onClick={editarUsuario}>Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {mensaje && <Alerta alerta={alerta} />}
    </>
  )
}
