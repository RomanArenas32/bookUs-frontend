import { Footer, Header, Navegacion, Presentacion } from "../components"
import './public.css'

export const Home = () => {

  return (
    <>
      <Header />
      <Navegacion />

      <div className="titulo-home">
        <h4>Aqui podras descargar contenido exclusivo</h4>
        <h4>Crea una cuenta y comienza a aprender</h4>
      </div>


      <div className="presentacion-home">
        <Presentacion />
      </div>

      <Footer />
    </>
  )
}
