import { Route, Routes } from "react-router-dom";
import { Login, Registro } from "../auth";
import { Home } from "../public";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
        </Routes>
    )
}
