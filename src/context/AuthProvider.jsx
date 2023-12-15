import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //comprueba todo el tiempo si el usuario esta autenticado
  const [usuarioAuth, setUsuarioAuth] = useState({});

useEffect(() => {
  const autenticarUsuario = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Configurar los headers con el token
      const config = {
        headers: {
          "token": `${token}`
        }
      };
     
      // Realizar la solicitud con los headers configurados
      const { data } = await clienteAxios.get('usuarios/perfil', config);
      setUsuarioAuth(data.usuario);
      
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  autenticarUsuario();
}, []);



  return (
    <AuthContext.Provider
      value={{
        usuarioAuth,
        setUsuarioAuth
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