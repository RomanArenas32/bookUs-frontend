import './utils.css'
export const Busqueda = ({ titulo }) => {
    return (
        <div>
            <input type="text" name="text" className="busqueda" placeholder={titulo} required=""/>
        </div>
    )
}
