import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //comprueba todo el tiempo si el usuario esta autenticado
  const [auth, setAuth] = useState(false);
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
      console.log(data);
      setUsuarioAuth(data);
      
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  autenticarUsuario();
}, []);



  /* useEffect(()=>{
    const autenticarUsuario = async()=>{
      const token = localStorage.getItem('token');
      //console.log(token)
      if(!token) return


      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const {data} = await clienteAxios.get(`/users/perfil`, config);
       // console.log(data)
        setAuth(data.user)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
    autenticarUsuario();
  }, [])
*/
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
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