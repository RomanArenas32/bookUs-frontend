import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Registro } from "../auth";
import { Home } from "../public";
import { AgregarLibro, EditarUsuario, ListaLibros, ListaUsuarios } from "../private";
import { useAuth } from "../hooks";

export const AppRoutes = () => {
    const { usuarioAuth } = useAuth();
    const { correo } = usuarioAuth;

    return (
        <Routes>
            {correo ? (
                <>
                    <Route path="/editusuario" element={<EditarUsuario />} />
                    <Route path="/libros" element={<ListaLibros />} />
                    <Route path="/agregarlibro" element={<AgregarLibro />} />
                    <Route path="/listarusuarios" element={<ListaUsuarios />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </>
            )}

            {correo && <Route path="/" element={<Navigate to="/libros" replace />} />}
            {correo && <Route path="/login" element={<Navigate to="/libros" replace />} />}
            {correo && <Route path="/registro" element={<Navigate to="/libros" replace />} />}
        </Routes>
    );
};
