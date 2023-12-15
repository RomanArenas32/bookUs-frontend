import { Route, Routes } from "react-router-dom";
import { Login, Registro } from "../auth";
import { Home } from "../public";
import { AgregarLibro, EditarUsuario, ListaLibros } from "../private";

export const AppRouter = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/*private routes */}
            <Route path="/editusuario" element={<EditarUsuario />} />
            <Route path="/libros" element={<ListaLibros />} />
            <Route path="/agregarlibro" element={<AgregarLibro />} />

        </Routes>
    )
}
