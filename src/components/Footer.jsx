import './components.css'
import { RedesSociales } from "../utils"

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>Todos los derechos "coloca aqui tu nombre"<span>2023</span></p>
      </div>
      <div>
        <RedesSociales />
      </div>
    </footer>
  )
}
