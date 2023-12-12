import {  useNavigate } from "react-router-dom";
import { Button } from "../utils";
import './components.css';

export const Navegacion = () => {

  const navigate = useNavigate();

  const irIniciarSesion = ()=>{
    setTimeout(() => {
      navigate('/login')
    }, 1500);
    
  }

  return (
    <nav className="navegacion">
      <div className="iniciarSesion" onClick={irIniciarSesion}>
        <Button titulo={"iniciar Sesion"}/>
      </div>

    </nav>
  )
}
