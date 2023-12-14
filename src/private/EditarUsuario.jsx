import './private.css';
import '../auth/auth.css'
import { Footer, Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const EditarUsuario = () => {

    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();
    const [repetirPass, setRepetirPass] = useState("");
    const [rol, setRol] = useState("");

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: "USER_ROLE"
    });
    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Actualizar el estado con los nuevos valores
        setFormData({
            ...formData,
            [id]: value,
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if ([formData.nombre, formData.apellido, formData.correo, formData.password].includes("")) {
            setAlerta({ mensaje: 'No puede haber campos vacios', error: true });
            return;
        }
        if (formData.password !== repetirPass) {
            setAlerta({ mensaje: 'Las contraseñas deben ser iguales', error: true });
            return;
        }
        if (rol === import.meta.env.VITE_ADMIN) {
            formData.rol = "ADMIN_ROLE"
        }
        try {
            const { data } = await clienteAxios.put(`/usuarios`, formData);
            console.log(data)
            setAlerta({ mensaje: "Usuario actualizado correctamente", error: false })
        } catch (error) {
            console.log(error)
            setAlerta({ mensaje: error.response.data.msg, error: true })
            return;
        }
        /*setTimeout(() => {
          navigate("../libros")
        }, 6000);*/
    }
    const { mensaje } = alerta;
    return (
        <>
            <Header />
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
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                                </svg>
                                <input type="password" className="input-field" placeholder="nueva contraseña"
                                    id="password"
                                    onChange={handleInputChange} value={formData.password}
                                />
                            </div>
                            <div className="field">
                                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                </svg>
                                <input type="text" className="input-field" placeholder="clave de administrador si tienes" />

                            </div>

                            <div className="btn">
                                <button className="button2" onClick={onSubmit}>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                mensaje && <Alerta alerta={alerta} />
            }
            <Footer />
        </>
    )
}
