import { Footer, Header, Navegacion, Presentacion } from "../components"
import './public.css'

export const Home = () => {
  return (
    <>
      <Header />
      <div className="presentacion-home">
        <Presentacion />
      </div>

      <Navegacion />
      <Footer />
    </>
  )
}
