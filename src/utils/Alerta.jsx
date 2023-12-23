import './utils.css'
export const Alerta = ({alerta}) => {
    const {mensaje, error} = alerta;
  return (
    <div className={error ? "boton-error" : "boton-exito"}>{mensaje}</div>
  )
}