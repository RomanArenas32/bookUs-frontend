import { useNavigate } from 'react-router-dom';
import { Presentacion } from '../components';
import { Button } from '../utils';
import './public.css';

export const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="titulo-home">
        <h4>Aqui podras descargar contenido exclusivo</h4>
        <h4>Crea una cuenta y comienza a aprender</h4>
        <div onClick={() => navigate("../login")}>
          <Button titulo={"Iniciar Sesion"} />
        </div>

      </div>

      <div className="presentacion-home">
        <Presentacion />
      </div>
    </>

  )
}
