import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //comprueba todo el tiempo si el usuario esta autenticado
  const [auth, setAuth] = useState("");
  const [usuarioAuth, setUsuarioAuth] = useState({});

  useEffect(()=>{
     const autenticarUsuario = async()=>{
       const token = localStorage.getItem('token');
       if(!token) return

       try {
         setAuth("autenticated")
       } catch (error) {
         console.log(error.response.data.msg)
       }
     }
     autenticarUsuario();
   }, [])
 
   console.log(auth)
  /* const actualizarPerfil = async datos => {
     const { _id } = datos;
     const token = localStorage.getItem('token')
 
     if (!token) {
       setCargando(false);
       return
     }
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       }
     }
     try {
       const url = `/users/perfil/${_id}`;
       const { data } = await clienteAxios.put(url, datos, config);
       return {
         msg: "Usuario actualizado con exito",
         error: false
       }
     } catch (error) {
       return {
         msg: error.response.data.msg,
         error: true
       }
     }
 
   }
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