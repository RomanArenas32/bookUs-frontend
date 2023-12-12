import './private.css';
import '../auth/auth.css'
import { Footer, Header } from '../components';

export const EditarUsuario = () => {
    return (
        <>
        <Header/>
            <div className='login-container'>
                <div className="card">
                    <div className="card2">
                        <form className="form">
                            <p id="heading">EDITAR PERFIL</p>
                            <div className="field">
                                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                </svg>
                                <input type="text" className="input-field" placeholder="nombre" />
                            </div>
                            <div className="field">
                                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                </svg>
                                <input type="text" className="input-field" placeholder="apellido" />
                            </div>
                          
                            <div className="field">
                                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                                </svg>
                                <input type="password" className="input-field" placeholder="contraseña" />
                            </div>
                            <div className="field">
                                <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                </svg>
                                <input type="text" className="input-field" placeholder="clave de administrador si tienes" />

                            </div>

                            <div className="btn">
                                <button className="button2">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
