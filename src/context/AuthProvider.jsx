import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuarioAuth, setUsuarioAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const config = {
          headers: {
            "token": `${token}`
          }
        };
        const { data } = await clienteAxios.get('usuarios/perfil', config);
        setUsuarioAuth(data.usuario);

      } catch (error) {
        console.log(error)
        console.log(error.response.data.msg);
      }
    };

    autenticarUsuario();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        usuarioAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export {
  AuthProvider
}

export default AuthContext